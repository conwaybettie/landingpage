Papa.parse("data/videos.csv", {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function (results) {

    const data = results.data.filter(v =>
      v.id && v.title && v.thumbnail && v.video_url
    );

    if (!data.length) return;

    const heroSlider = document.getElementById("hero-slider");

    // HERO SLIDES (ambil 10 postingan pertama)
    data.slice(0, 10).forEach((v, i) => {
      heroSlider.innerHTML += `
        <div class="hero-slide ${i === 0 ? "active" : ""}"
          style="background-image:
          linear-gradient(to top, rgba(11,15,25,.95), rgba(11,15,25,.3)),
          url('${v.thumbnail}')">
          <div class="hero-overlay">
            <h1>${v.title}</h1>
            <p>${v.description || ""}</p>
            <a href="pages/watch.html?id=${v.id}" class="btn-primary">▶ WATCH</a>
          </div>
        </div>
      `;
    });

    // AUTO SLIDE
    let index = 0;
    const slides = document.querySelectorAll(".hero-slide");

    setInterval(() => {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }, 5000);

    // TRENDING & EXPLORE
    const trending = document.getElementById("trending");
    const explore = document.getElementById("explore");

    data.forEach((v, i) => {
      const card = `
        <a href="pages/watch.html?id=${v.id}" class="movie-card">
          <img src="${v.thumbnail}" loading="lazy">
        </a>
      `;

      if (i < 10) trending.innerHTML += card;
      explore.innerHTML += card;
    });
  }
});
