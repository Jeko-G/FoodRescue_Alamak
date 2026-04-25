import { Link } from 'react-router-dom';

const categoryLabel = {
  nasi: '🍚 Nasi',
  lauk: '🍗 Lauk',
  snack: '🍪 Snack',
  minuman: '🥤 Minuman',
  buah: '🍎 Buah',
  sayur: '🥦 Sayur',
  roti: '🍞 Roti',
  lainnya: '🍽️ Lainnya'
};

const statusBadge = {
  available: 'success',
  claimed: 'warning',
  completed: 'secondary',
  expired: 'danger'
};

const DonationCard = ({ donation }) => {
  const deadline = new Date(donation.pickupDeadline);
  const isExpiringSoon = (deadline - new Date()) < 24 * 60 * 60 * 1000;

  return (
    <div className="card h-100 shadow-sm">
      {donation.photo ? (
        <img
          src={donation.photo}
          className="card-img-top"
          alt={donation.title}
          style={{ height: '180px', objectFit: 'cover' }}
        />
      ) : (
        <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '180px' }}>
          <span style={{ fontSize: '60px' }}>🍱</span>
        </div>
      )}

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="card-title mb-0">{donation.title}</h6>
          <span className={`badge bg-${statusBadge[donation.status]} ms-2`}>
            {donation.status}
          </span>
        </div>

        <p className="text-muted small mb-1">
          {categoryLabel[donation.category]} · {donation.quantity}
        </p>
        <p className="text-muted small mb-1">📍 {donation.location}</p>
        <p className={`small mb-2 ${isExpiringSoon ? 'text-danger fw-bold' : 'text-muted'}`}>
          ⏰ {deadline.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
          {isExpiringSoon && ' (Segera habis!)'}
        </p>

        <p className="small text-muted mb-3 flex-grow-1">
          {donation.description.length > 80
            ? donation.description.substring(0, 80) + '...'
            : donation.description}
        </p>

        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Oleh: {donation.donor?.name || 'Anonim'}
            {donation.donor?.rating > 0 && (
              <span className="ms-1 text-warning">⭐ {donation.donor.rating}</span>
            )}
          </small>
          <Link to={`/donations/${donation._id}`} className="btn btn-success btn-sm">
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
