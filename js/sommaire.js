document.addEventListener('DOMContentLoaded', async () => {
  const list = document.querySelector('.sommaire__list');
  if (!list) return;

  try {
    const res = await fetch('data/projects.json');
    const data = await res.json();
    const projects = data.items || data;

    list.innerHTML = projects.map(p => {
      const slug = p.slug || p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
      return `
      <li class="sommaire__item">
        <a href="project.html?slug=${slug}" class="sommaire__link">
          <span class="sommaire__name">${p.name}</span>
          <span class="sommaire__type">${p.type}</span>
          <span class="sommaire__category">${p.category}</span>
          <span class="sommaire__year">${p.year}</span>
        </a>
      </li>`;
    }).join('');
  } catch (e) {
    console.error('Erreur chargement projets:', e);
  }
});
