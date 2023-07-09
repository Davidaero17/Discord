
const apiKey = 'YOUR_NEWS_API_KEY'; // Replace with your actual News API key
const newsList = document.getElementById('news-list');
const nextBtn = document.getElementById('next-btn');

// Fetch news from the API
async function fetchNews() {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Display news articles in the list
function displayNews(articles) {
  newsList.innerHTML = '';
  articles.forEach(article => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');
    newsItem.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.description}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    newsList.appendChild(newsItem);
  });
}

// Handle next button click event
nextBtn.addEventListener('click', async () => {
  const articles = await fetchNews();
  displayNews(articles);
});

// Initial fetch and display of news articles
fetchNews().then(articles => {
  displayNews(articles);
});

const contactForm = document.getElementById('contact-form');

// Handle form submission
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form data
  const name = contactForm.elements.name.value;
  const email = contactForm.elements.email.value;
  const message = contactForm.elements.message.value;

  // Create payload object
  const payload = {
    username: 'Contact Form',
    content: `**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}`
  };

  try {
    // Send POST request to Discord webhook URL
    await fetch('YOUR_DISCORD_WEBHOOK_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // Clear form fields
    contactForm.reset();
    alert('Message sent successfully!');
  } catch (error) {
    console.error('Error sending message:', error);
    alert('An error occurred while sending the message.');
  }
});
