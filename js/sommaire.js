document.addEventListener('DOMContentLoaded', async () => {
  const list = document.querySelector('.sommaire__list');
  if (!list) return;

  try {
    const res = await fetch('/data/projects.json');
    const data = await res.json();
    const projects = data.items || data;

    list.innerHTML = projects.map(p => `
      <li class="sommaire__item">
        <span class="sommaire__name">${p.name}</span>
        <span class="sommaire__type">${p.type}</span>
        <span class="sommaire__category">${p.category}</span>
        <span class="sommaire__year">${p.year}</span>
      </li>
    `).join('');
  } catch (e) {
    console.error('Erreur chargement projets:', e);
  }
});
