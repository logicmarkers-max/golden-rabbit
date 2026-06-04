import React, { useEffect } from 'react';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { FilterProvider } from './contexts/FilterContext';
import { ToastProvider } from './components/Toast/Toast';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Categories from './components/Categories/Categories';
import Products from './components/Products/Products';
import Footer from './components/Footer/Footer';
import TrustBar from './components/TrustBar/TrustBar';
import './App.css';

function App() {
  useEffect(() => {
    const createRandomFirework = () => {
      const container = document.querySelector('.fireworks-container');
      if (!container) return;

      // Much more random position (5% to 95% of screen width)
      const randomLeft = Math.random() * 90 + 5;
      
      // Random burst height (30vh to 80vh - much more variation)
      const randomHeight = Math.random() * 50 + 30; // 30vh to 80vh
      
      // Enhanced color palette with more vibrant options
      const colors = ['gold', 'red', 'green', 'blue', 'purple', 'orange', 'pink', 'cyan', 'white', 'silver'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      // More varied spark counts for different sized bursts
      const burstSize = Math.random();
      let primarySparks, secondarySparks, tertiarySparkCount;
      
      if (burstSize > 0.8) {
        // Large spectacular burst
        primarySparks = Math.floor(Math.random() * 8) + 16; // 16-24
        secondarySparks = Math.floor(Math.random() * 8) + 12; // 12-20
        tertiarySparkCount = Math.floor(Math.random() * 6) + 8; // 8-14
      } else if (burstSize > 0.5) {
        // Medium burst
        primarySparks = Math.floor(Math.random() * 6) + 12; // 12-18
        secondarySparks = Math.floor(Math.random() * 6) + 8; // 8-14
        tertiarySparkCount = Math.floor(Math.random() * 4) + 6; // 6-10
      } else {
        // Small burst
        primarySparks = Math.floor(Math.random() * 4) + 8; // 8-12
        secondarySparks = Math.floor(Math.random() * 4) + 6; // 6-10
        tertiarySparkCount = Math.floor(Math.random() * 3) + 4; // 4-7
      }
      
      // Create firework group
      const fireworkGroup = document.createElement('div');
      fireworkGroup.className = `skyshot-group color-${randomColor}`;
      fireworkGroup.style.left = `${randomLeft}%`;
      fireworkGroup.style.animationDelay = `${Math.random() * 4}s`;
      
      // Set custom burst height
      fireworkGroup.style.setProperty('--burst-height', `${randomHeight}vh`);
      
      // Create rocket
      const rocket = document.createElement('div');
      rocket.className = 'skyshot-rocket';
      fireworkGroup.appendChild(rocket);
      
      // Create primary explosion with enhanced effects
      const primaryExplosion = document.createElement('div');
      primaryExplosion.className = 'explosion explosion-primary';
      primaryExplosion.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.6})`;
      primaryExplosion.style.bottom = `${randomHeight}vh`;
      
      for (let i = 0; i < primarySparks; i++) {
        const spark = document.createElement('div');
        
        // Enhanced animation variety
        const animationType = Math.random();
        let animationClass;
        
        if (animationType > 0.85) {
          // Extended spectacular animations
          animationClass = `sparkBurstExtended${Math.floor(Math.random() * 4) + 1}`;
        } else if (animationType > 0.7) {
          // Random burst animations
          animationClass = `sparkBurstRandom${Math.floor(Math.random() * 2) + 1}`;
        } else {
          // Regular burst animations
          animationClass = `spark-${(i % 8) + 1}`;
        }
        
        spark.className = `spark enhanced-spark ${animationClass}`;
        
        // More dramatic positioning and effects
        const spreadRadius = 40 + Math.random() * 20; // 40-60px spread
        const angle = (i / primarySparks) * 360 + (Math.random() - 0.5) * 45; // More even distribution
        const x = Math.cos(angle * Math.PI / 180) * (Math.random() * spreadRadius);
        const y = Math.sin(angle * Math.PI / 180) * (Math.random() * spreadRadius);
        
        spark.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.6})`;
        spark.style.animationDelay = `${Math.random() * 0.8}s`;
        spark.style.filter = `brightness(${0.8 + Math.random() * 0.4}) saturate(${0.9 + Math.random() * 0.3})`;
        
        primaryExplosion.appendChild(spark);
      }
      
      // Create enhanced secondary explosion
      const secondaryExplosion = document.createElement('div');
      secondaryExplosion.className = 'explosion explosion-secondary';
      secondaryExplosion.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.7 + Math.random() * 0.6})`;
      secondaryExplosion.style.bottom = `${randomHeight}vh`;
      
      for (let i = 0; i < secondarySparks; i++) {
        const miniSpark = document.createElement('div');
        
        // Enhanced secondary animations
        const animationType = Math.random();
        let animationClass;
        
        if (animationType > 0.8) {
          animationClass = `miniSparkExtended${Math.floor(Math.random() * 4) + 1}`;
        } else if (animationType > 0.6) {
          animationClass = `miniSparkRandom${Math.floor(Math.random() * 2) + 1}`;
        } else {
          animationClass = `mini-${(i % 8) + 1}`;
        }
        
        miniSpark.className = `mini-spark enhanced-mini-spark ${animationClass}`;
        
        // Better distribution for secondary sparks
        const spreadRadius = 25 + Math.random() * 15; // 25-40px spread
        const angle = (i / secondarySparks) * 360 + (Math.random() - 0.5) * 60;
        const x = Math.cos(angle * Math.PI / 180) * (Math.random() * spreadRadius);
        const y = Math.sin(angle * Math.PI / 180) * (Math.random() * spreadRadius);
        
        miniSpark.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg) scale(${0.6 + Math.random() * 0.8})`;
        miniSpark.style.animationDelay = `${Math.random() * 1.2}s`;
        miniSpark.style.filter = `brightness(${0.9 + Math.random() * 0.3})`;
        
        secondaryExplosion.appendChild(miniSpark);
      }
      
      // Create spectacular tertiary explosion for larger bursts
      const tertiaryExplosion = document.createElement('div');
      tertiaryExplosion.className = 'explosion explosion-tertiary';
      tertiaryExplosion.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.4 + Math.random() * 0.4})`;
      tertiaryExplosion.style.bottom = `${randomHeight}vh`;
      
      for (let i = 0; i < tertiarySparkCount; i++) {
        const tinySpark = document.createElement('div');
        tinySpark.className = `tiny-spark tiny-${(i % 6) + 1}`;
        
        // Tiny sparks for extra sparkle effect
        const spreadRadius = 15 + Math.random() * 10;
        const angle = (i / tertiarySparkCount) * 360 + (Math.random() - 0.5) * 90;
        const x = Math.cos(angle * Math.PI / 180) * (Math.random() * spreadRadius);
        const y = Math.sin(angle * Math.PI / 180) * (Math.random() * spreadRadius);
        
        tinySpark.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
        tinySpark.style.animationDelay = `${Math.random() * 1.5}s`;
        tinySpark.style.filter = `brightness(${1 + Math.random() * 0.5})`;
        
        tertiaryExplosion.appendChild(tinySpark);
      }
      
      fireworkGroup.appendChild(primaryExplosion);
      fireworkGroup.appendChild(secondaryExplosion);
      fireworkGroup.appendChild(tertiaryExplosion);
      container.appendChild(fireworkGroup);
      
      // Remove firework after extended animation completes
      setTimeout(() => {
        if (container.contains(fireworkGroup)) {
          container.removeChild(fireworkGroup);
        }
      }, 15000); // Extended time for more complex animations
    };

    // Subtle ambient fireworks for demo (not distracting)
    for (let i = 0; i < 2; i++) {
      setTimeout(() => createRandomFirework(), i * 2500);
    }

    const interval = setInterval(() => {
      createRandomFirework();
    }, 6000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <FilterProvider>
          <ToastProvider>
            <div className="App">
              <div className="fireworks-container"></div>
              <Header />
              <main>
                <Hero />
                <TrustBar />
                <section className="section-spacing">
                  <Categories />
                </section>
                <section className="section-spacing" id="products">
                  <Products />
                </section>
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </FilterProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
