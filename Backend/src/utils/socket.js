import { Server } from 'socket.io';
import { Appointment } from '../models/appointment.model.js';

export const initializeSignaling = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN, // Update with your frontend URL
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Helper function for appointment validation
    const validateAppointment = async (roomId, userId) => {
      const appointment = await Appointment.findOne({ roomId });
      if (!appointment) return { error: 'Appointment not found', appointment: null };

      const { patientId, doctorId, timeSlot } = appointment;
      const slotDate = new Date(`${timeSlot.day} ${timeSlot.time}`);
      const now = new Date();

      // Validate user and time slot
      if (userId !== String(patientId) && userId !== String(doctorId)) {
        return { error: 'Unauthorized access', appointment: null };
      }
      if (now < slotDate) return { error: 'Session has not started yet', appointment: null };
      if (now > new Date(slotDate.getTime() + 30 * 60 * 1000)) {
        return { error: 'Session time has ended', appointment: null };
      }

      return { error: null, appointment };
    };

    // Join a room
    socket.on('join-room', async (roomId, userId) => {
      try {
        const { error, appointment } = await validateAppointment(roomId, userId);
        if (error) {
          socket.emit('error', error);
          return;
        }

        console.log(`${userId} joined room ${roomId}`);
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId);

        // Handle disconnection
        socket.on('disconnect', () => {
          console.log(`${userId} disconnected from room ${roomId}`);
          socket.to(roomId).emit('user-disconnected', userId);
        });
      } catch (error) {
        console.error(error);
        socket.emit('error', 'An unexpected error occurred while joining the room');
      }
    });

    // Handle session ending
    socket.on('end-session', async (roomId, userId) => {
      try {
        const appointment = await Appointment.findOne({ roomId });
        if (!appointment) {
          socket.emit('error', 'Appointment not found');
          return;
        }

        // Only the doctor can end the session
        if (userId !== String(appointment.doctorId)) {
          socket.emit('error', 'Only the doctor can end the session');
          return;
        }

        // Update appointment status and session end time
        appointment.status = 'completed';
        appointment.sessionEnd = new Date();
        await appointment.save();

        // Notify all participants in the room
        io.to(roomId).emit('session-ended', {
          message: 'The session has ended',
          roomId,
          endTime: appointment.sessionEnd,
        });
      } catch (error) {
        console.error(error);
        socket.emit('error', 'An unexpected error occurred while ending the session');
      }
    });
  });
};
