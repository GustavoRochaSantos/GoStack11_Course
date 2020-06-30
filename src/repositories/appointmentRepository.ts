import Appointment from '../models/appointment';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findSameDateInAppointment = await this.findOne({ where: { date } });

    return findSameDateInAppointment || null;
  }
}

export default AppointmentRepository;
