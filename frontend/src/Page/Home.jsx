import { Link } from 'react-router';
import api from '../utils/api';
import React from 'react';
import { withRouter } from '../Wrapper/withRouter';

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      profile: null,
      donations: [],
      userPos: null,
      locationLoading: false,
      locationError: null
    }
  }

  tryGetLocation = () => {
    navigator.geolocation?.getCurrentPosition(
      pos => {
        const { latitude, longitude, accuracy } = pos.coords;

        console.log("Akurasi:", accuracy);

        this.setState({
            userPos: {
            lat: latitude,
            lng: longitude,
            accuracy: accuracy
          },
          locationLoading: true
        });

        // 🔥 warning kalau tidak akurat
        if (accuracy > 100) {
          console.warn("Lokasi kurang akurat:", accuracy, "meter");
        }
      },
        err => {
          // Fallback pakai IP geolocation gratis
          fetch('https://ipapi.co/json/')
            .then(r => r.json())
            .then(data => {
              if (data.latitude && data.longitude) {
                this.setState({
                    userPos: {
                    lat: data.latitude,
                    lng: data.longitude,
                    accuracy: data.accuracy
                  },
                  locationLoading: false
                });
              } else {
                this.setState({
                  locationError: "Gagal deteksi lokasi",
                  locationLoading: false
                });
              }
            })
            .catch(() => {
              this.setState({
                locationError: "Gagal deteksi lokasi",
                locationLoading: false
              });
            });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    };
  
  fetchDonation = async () => {
    const params = new URLSearchParams()

    params.append('city', "");
    params.append('search', "");
    params.append('filter', "");
    params.append('halal', "");

    const res = await api.get(`/donations?${params.toString()}`);
    this.setState({donations: res.data.slice(0, 6)})
    
  }

  getStatusBadge = (status) => {
    if (status === 'available') return <span className="badge bg-success">Tersedia</span>;
    if (status === 'partially_claimed') return <span className="badge bg-info">Sebagian Diklaim</span>;
    return <span className="badge bg-secondary">{status}</span>;
  };

  getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  componentDidMount(){
    api.get('/users/profile')
      .then(res => {
        this.setState({profile : res.data});
      })
    this.fetchDonation();
    this.tryGetLocation();
  }

  render(){
    const isProvider = this.state.profile?.role === "food_provider";
    console.log(this.state.donations);

    const filteredDonations = this.state.donations.filter(d => {
      // Filter radius — skip kalau koordinat 0,0
      if (this.state.userPos) {
        const coords = d.pickup_location?.coordinates;
        if (coords && !(coords[0] === 0 && coords[1] === 0)) {
          const dist = this.getDistance(this.state.userPos.lat, this.state.userPos.lng, coords[1], coords[0]);
          if (dist > 100) {
            return false;
          };
        }
      }
      return true;
    });

    console.log("This is it :", filteredDonations)

    return (
      <div className='container-md outfit position-relative py-4 py-md-5 px-4 px-md-5'>
        <div className='p-4 p-md-5 left-signin rounded-4 position-relative grid-detail-light'>
          <span className='card-transparent text-white fw-semibold py-1 px-2 rounded-5' style={{fontSize:"small"}}>
            {
              this.state.profile?.role === "food_provider" ? "🍱 Food Provider" : this.state.profile?.role === "admin" ? "⚙️ Admin" : "🤲 Food Seeker"
            }
          </span>
          
          <h1 className='text-white syne-h1 my-3'>
            Selamat Datang Kembali, {this.state.profile?.user?.first_name} 👋
          </h1>
          <p className='text-light '>
            {
              this.state.profile?.role === "food_provider" ? (
                this.state.profile?.profile?.total_donations === 0 ? "Kamu belum mendonasikan makanan sejauh ini. Mari bersama membantu yang membutuhkan!" : `Kamu telah mendonasikan ${this.state.profile?.profile.total_donations} porsi makanan. Terus semangat membantu sesama!`
              ) : (
                this.state.profile?.profile?.total_claims === 0 ? "Kamu masih ada kesempatan untuk claim makanan donatur!" : `Kamu telah claim ${this.state.profile?.profile.total_donations} porsi makanan. Semoga anda sehat selalu!`
              ) 
            }
          </p>
          
          <div className='position-relative mt-4'>
            {
              isProvider && (
                <button className='btn btn-green-gradient position-relative py-2 px-4 fw-bold me-2' style={{background: "#FFFFFF", color:"var(--g1)"}}>
                  <i className="bi bi-gift me-2"></i>
                  Donasi Sekarang
                </button>
              )
            }
            <button className='btn btn-green-gradient py-2 px-4 fw-bold'>
                <i className="bi bi-map me-2"></i>
                Lihat Peta
            </button>
          </div>
          
        </div>

        <div className='mt-5 row align-items-center justify-content-center gap-2'>
            <button className='col card-green py-4 px-5 d-flex flex-column gap-1 rounded-4'>
              <h1>🍱</h1>
              <p className='text-green1 fw-bold text-nowrap' style={{fontSize:"small"}}>Buat Donasi</p>
              <p className='text-green4 text-nowrap' style={{fontSize:"small"}}>Bagikan makanan</p>
            </button>
            <button className='col card-green py-4 px-5 d-flex flex-column gap-1 rounded-4'>
              <h1>🔎</h1>
              <p className='text-green1 fw-bold text-nowrap' style={{fontSize:"small"}}>Cari Donasi</p>
              <p className='text-green4 text-nowrap' style={{fontSize:"small"}}>Temukan makanan</p>
            </button>
            <button className='col card-green py-4 px-5 d-flex flex-column gap-1 rounded-4'>
              <h1>💬</h1>
              <p className='text-green1 fw-bold text-nowrap' style={{fontSize:"small"}}>Chat</p>
              <p className='text-green4 text-nowrap' style={{fontSize:"small"}}>Berbicara langsung</p>
            </button>
            <button className='col card-green py-4 px-5 d-flex flex-column gap-1 rounded-4'>
              <h1>👥</h1>
              <p className='text-green1 fw-bold text-nowrap' style={{fontSize:"small"}}>Komunitas</p>
              <p className='text-green4 text-nowrap' style={{fontSize:"small"}}>Forum Diskusi</p>
            </button>
        </div>

        <div className='w-100 row align-items-center justify-content-center mt-3 g-0 gap-2'>
            <div className='col card-basic py-4 px-5 rounded-4'>
              <h1 className='syne-h1 text-green1'>{this.state.profile?.profile.total_donations}</h1>
              <p className='text-green3 text-nowrap'>TOTAL DONASI</p>
            </div>
            <div className='col card-basic py-4 px-5 rounded-4'>
              <h1 className='syne-h1 text-green1'>{this.state.profile?.profile.total_claims}</h1>
              <p className='text-green3 text-nowrap'>CLAIM</p>
            </div>
            <div className='col card-basic py-4 px-5 rounded-4'>
              <h1 className='syne-h1 text-green1'>{this.state.profile?.total_points}</h1>
              <p className='text-green3 text-nowrap'>TOTAL POINS</p>
            </div>
            <div className='col card-basic py-4 px-5 rounded-4'>
              <h1 className='syne-h1 text-green1'>{this.state.profile?.trust_score} <i className="bi bi-star-fill text-cream3"></i></h1>
              <p className='text-green3 text-nowrap'>RATING KAMU</p>
            </div>
        </div>

        <div className='mt-5'>
            <h4 className='syne-h1 text-green1 mb-3'>Donasi Tersedia Sekarang</h4>

            {
              filteredDonations.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-basket2 display-3 text-green4"></i>
                  <p className="text-green4 mt-2">Tidak ada donasi</p>
                </div>
              ) : (
                <div className="row g-3">
                    {filteredDonations.map(d => (
                    <div className="col-md-6" key={d._id}>
                      <div className="card h-100 outfit" style={{backgroundColor:" var(--surface)", border: "1px solid var(--border)", boxShadow:"var(--shadow)"}}>
                        {d.photos?.length > 0 ? (
                          <img src={`/uploads/${d.photos[0].photo_url}`}
                            className="card-img-top" alt={d.title}
                            style={{ height: '150px', objectFit: 'cover' }} />
                        ) : (
                          <div className="bg-light d-flex align-items-center justify-content-center"
                            style={{ height: '150px' }}>
                            <i className="bi bi-image display-4 text-muted"></i>
                          </div>
                        )}
                        <div className="card-body d-flex flex-column p-2">
                          <div className="d-flex justify-content-between align-items-start mb-1">
                            <h6 className="fw-bold text-green1 mb-0 small">{d.title}</h6>
                            {this.getStatusBadge(d.status)}
                          </div>
                          <div className="mt-auto">
                            <div className="d-flex flex-wrap gap-1 mb-1">
                              {d.category_id && (
                                <span className="badge bg-light text-dark border" style={{ fontSize: '0.65rem' }}>
                                  {d.category_id.icon_emoji} {d.category_id.name}
                                </span>
                              )}
                              {d.is_halal && <span className="badge bg-success" style={{ fontSize: '0.65rem' }}>✅ Halal</span>}
                            </div>
                            <div className="small text-green3 mb-1">
                              <i className="bi bi-box me-1"></i>
                              {d.quantity_remaining}/{d.quantity} {d.quantity_unit}
                            </div>
                            <div className="small text-green3 mb-1">
                              <i className="bi bi-geo-alt me-1"></i>{d.pickup_city}
                            </div>
                            {d.pickup_start_time && (
                              <div className="small text-green3 mb-1">
                                <i className="bi bi-clock me-1"></i>
                                {d.pickup_start_time} - {d.pickup_end_time}
                              </div>
                            )}
                            {/* Jarak */}
                            {this.state.userPos && d.pickup_location?.coordinates &&
                              !(d.pickup_location.coordinates[0] === 0) && (
                              <div className="small text-success mb-1">
                                <i className="bi bi-geo me-1"></i>
                                {this.getDistance(
                                  this.state.userPos.lat, this.state.userPos.lng,
                                  d.pickup_location.coordinates[1],
                                  d.pickup_location.coordinates[0]
                                ).toFixed(1)} km dari kamu
                              </div>
                            )}
                            <div className="small text-green2 mb-2">
                              <i className="bi bi-person me-1"></i>
                              {d.provider_id?.first_name} {d.provider_id?.last_name}
                              <span className="text-warning ms-1">
                                ★ {d.provider_id?.trust_score?.toFixed(1) || '5.0'}
                              </span>
                            </div>
                            <Link to={`/donations/${d._id}`} className="btn btn-outline-green btn-sm w-100">
                              Lihat Detail
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }

        </div>

      </div>
    
    );
  }
}

export default withRouter(Home);