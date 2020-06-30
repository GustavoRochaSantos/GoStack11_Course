import { startOfHour } from 'date-fns';
import Appointment from '../models/appointment';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/appointmentRepository';

import AppError from '../errors/appErrors';

interface Params {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Params): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const findSameDateInAppointment = await appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findSameDateInAppointment)
      throw new AppError('This appointment is already booked.');

    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
