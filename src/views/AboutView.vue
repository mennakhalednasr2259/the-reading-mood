<template>
  <div class="about">
    <div class="card">
      <h1 class="title">About The Reading Mood</h1>
      <p class="subtitle">A simple way to pick books based on how you feel</p>

      <div class="line"></div>

      <div class="content">
        <p>
          We believe books shouldn’t only be grouped by genres like fiction or history.
          Sometimes the right book is the one that matches your mood.
        </p>

        <p>
          Whether you want something calm, emotional, fun, or a bit intense — the idea is to help you
          find something that fits your mood at the moment.
        </p>
      </div>

      <div class="footer">
        <p class="version">Version 1.0.0 • Simple Frontend Project</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 4rem auto;
  padding: 0 2rem;
}

.card {
  background-color: var(--bg-card);
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  padding: 3.5rem 2.5rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.01);
  text-align: center;
}

.title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1rem;
  color: var(--text-muted);
}

.line {
  width: 50px;
  height: 1px;
  background-color: var(--accent-color);
  margin: 2rem auto;
}

.content {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  line-height: 1.8;
  color: var(--text-main);
  font-size: 1.05rem;
  max-width: 600px;
  margin: 0 auto;
}

.footer {
  margin-top: 3rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
</style>