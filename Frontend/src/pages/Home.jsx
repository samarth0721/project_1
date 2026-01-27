import { NavLink } from "react-router-dom";
import Home1 from "../assets/Home-1.jpg";
import Home2 from "../assets/Home-2.jpg";
import Home3 from "../assets/Home-3.jpg";
import Home4 from "../assets/Home-4.jpg";
import HomeRegular from "../assets/Home-Regular.jpg"
import HomeGelato from "../assets/HomeGelato.jpg"
import HomeSorbet from "../assets/Home-Sorbet.jpg"
import HomeFY from "../assets/Home-Frozen-Yoghurt.jpg"
import HomeVegan from "../assets/Home-Vegan.jpg"
import HomeDineIn from "../assets/Home-DineIn.png";
import HomeDelivery from "../assets/Home-Delivery.png"
import HomeCatering from "../assets/Home-Catering.png"
import RangeFlavour from "../assets/HomeFR.png"
import Hygine from "../assets/HomeHygine.png"
import Quality from "../assets/HomeQuality.png"
import Fun from "../assets/HomeFun.png"
import './Home.css';
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
    return (
        <div>
            <div className="home-container">
                <div className="home-text fade-in">
                    <h1>Scoop into Happiness, Anytime, Anywhere!</h1>
                    <p>Welcome to the frozen feast, where the world of frozen delights comes alive! Get ready to embark on a mouthwatering journey through a virtual ice cream paradise. Whether you’re craving a cozy in-store treat, delivery to your doorstep, or a custom ice cream experience at your next event, we’re here to serve you the sweetest moments, wherever you are.</p>
                    <NavLink to="/products">
                        <button>Order</button>
                    </NavLink>
                </div>
                <div className="home-images">
                    <img src={Home1}></img>
                    <img src={Home2}></img>
                    <img src={Home3}></img>
                    <img src={Home4}></img>
                </div>
            </div>


            <div className="taste-section">
                <div className="taste-header">
                    <h1>Find Your Taste</h1>
                </div>

                <div className="taste-items">
                    <div className="taste-item">
                        <img src={HomeRegular} alt="Regular" />
                        <p>Regular</p>
                    </div>

                    <div className="taste-item">
                        <img src={HomeGelato} alt="Gelato" />
                        <p>Gelato</p>
                    </div>

                    <div className="taste-item">
                        <img src={HomeSorbet} alt="Sorbet" />
                        <p>Sorbet</p>
                    </div>

                    <div className="taste-item">
                        <img src={HomeFY} alt="Frozen Yogurt" />
                        <p>Frozen Yogurt</p>
                    </div>

                    <div className="taste-item">
                        <img src={HomeVegan} alt="Non-Dairy/Vegan" />
                        <p>Non-Dairy/Vegan</p>
                    </div>
                </div>
            </div>


            <div className="what-section">
                <div className="what-header">
                    <h1>What we do?</h1>
                </div>

                <div className="what-cards">
                    <div className="what-card">
                        <h2>Dine-In</h2>
                        <h4>Chill With Us – Indulge In-Store</h4>
                        <img src={HomeDineIn} alt="Dine In" />
                        <p>
                            Whether you're enjoying a family outing, a date, or a treat just for yourself,
                            our dine-in experience is the perfect way to savor handcrafted scoops,
                            decadent sundaes, and custom creations.
                        </p>
                        <NavLink to="/dinein">
                            <button>Find the nearest store to you <FaArrowRight /></button>
                        </NavLink>
                    </div>

                    <div className="what-card">
                        <h2>Delivery</h2>
                        <h4>Ice Cream On the Go – Delivered to Your Door</h4>
                        <img src={HomeDelivery} alt="Delivery" />
                        <p>
                            Whether it’s a late-night craving or a sweet surprise for someone special,
                            we’ll bring freshly scooped goodness straight to your doorstep – fast, fresh,
                            and frozen to perfection.
                        </p>
                        <NavLink to="/delivery">
                            <button>Enter your address <FaArrowRight /></button>
                        </NavLink>
                    </div>

                    <div className="what-card">
                        <h2>Catering</h2>
                        <h4>Sweeten Your Event – Ice Cream Catering</h4>
                        <img src={HomeCatering} alt="Catering" />
                        <p>
                            Whether it's a birthday party, wedding, corporate event, or any celebration,
                            we provide custom ice cream bars, sundae stations, or full-service catering
                            to keep your guests delighted.
                        </p>
                        <NavLink to="/catering">
                            <button>Tell us about your event <FaArrowRight /></button>
                        </NavLink>
                    </div>
                </div>
            </div>


            <div className="why-section"> 
  <div className="why-header">
    <h2>Why FrozenFeast</h2>
  </div>

  <div className="why-grid">
    <div className="why-card">
      <div><img src={RangeFlavour} alt="Range of Flavors" /></div>
      <div>
        <h3>Range of Flavors</h3>
        <p>From classic vanilla to exotic matcha, FrozenFeast offers a wide range of flavors to satisfy every palate.</p>
      </div>
    </div>

    <div className="why-card">
      <div><img src={Hygine} alt="Hygiene & Safety" /></div>
      <div>
        <h3>Hygiene & Food Safety</h3>
        <p>We maintain the highest hygiene standards, ensuring every scoop is safe and delicious.</p>
      </div>
    </div>

    <div className="why-card">
      <div><img src={Quality} alt="Quality" /></div>
      <div>
        <h3>Best Quality Ingredients</h3>
        <p>Only the finest ingredients make it into our ice cream, for a rich and unforgettable experience.</p>
      </div>
    </div>

    <div className="why-card">
      <div><img src={Fun} alt="Fun" /></div>
      <div>
        <h3>Fun & Friendly Atmosphere</h3>
        <p>Our parlors are designed to be fun and inviting, making every visit a sweet memory.</p>
      </div>
    </div>
  </div>
</div>


        </div >
    );
}

export default Home;