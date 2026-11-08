import { Link } from 'react-router-dom';
import { SITE } from '@/data/site';

/** Health guarantee preview for the home page: two headline facts and one link. Text only. */
export function HealthPreview() {
  return (
    <div className="health-preview">
      <b>{SITE.warrantyMonths}-month warranty. 72 hours with your own vet.</b>
      <Link className="textlink" to="/health" viewTransition>Read the health guarantee</Link>
    </div>
  );
}
