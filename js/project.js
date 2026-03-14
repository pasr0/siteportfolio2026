document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  if (!slug) {
    window.location.href = 'index.html';
    return;
  }

  try {
    const res = await fetch(`data/projects/${slug}.json`);
    if (!res.ok) throw new Error('Projet non trouvé');
    const project = await res.json();

    document.title = `Portfolio — ${project.name}`;
    document.querySelector('.project__name').textContent = project.name;
    document.querySelector('.project__type').textContent = project.type;
    document.querySelector('.project__category').textContent = project.category;
    document.querySelector('.project__year').textContent = project.year;

    if (project.description) {
      document.querySelector('.project__description').textContent = project.description;
    }

    const gallery = document.querySelector('.project__gallery');
    if (project.images && project.images.length > 0) {
      gallery.innerHTML = project.images
        .map(src => `<img src="${src}" alt="${project.name}">`)
        .join('');
    }
  } catch (e) {
    console.error('Erreur chargement projet:', e);
    document.querySelector('.project__name').textContent = 'Projet non trouvé';
  }
});
