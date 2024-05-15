//Set la date du jour par défaut dans le formulaire
const today = new Date().toISOString().split('T')[0];
document.getElementById('date').value = today;

const form = document.getElementById('news-form');
const deleteForms = document.querySelectorAll('.news-form');
const showTextBtns = document.querySelectorAll('.show-text');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);

    const content = tinymce.get('content').getContent();
    data.set('content', content);

    fetch('../api/news', {
        method: 'POST',
        body: data
    }).then(response => {
        if (response.ok) {
            location.reload();
        }
    })
    .catch(error => {
        console.error('Erreur lors de la requête :', error);
    })
});

deleteForms.forEach(form => {
    form.addEventListener('submit',  (event) => {
        event.preventDefault();
        const id = form.getAttribute('id');
        fetch(`../api/news/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        })
        .then(response => {
            if (response.ok) {
                location.reload();
            }
        })
        .catch(error => {
            console.error('Erreur lors de la requête :', error);
        })
    })
})

showTextBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const newsItem = btn.closest('.news-item');
        const text = newsItem.querySelector('.news-content');
        text.classList.toggle('hidden');
    })
})