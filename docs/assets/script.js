// Interactive scripts for AI-Guide site
// - Renders growth chart from sample data
// - Attempts to fetch GitHub repo summary (public API) and display

(async function(){
  // Helper to safe-query DOM
  const $ = (sel)=>document.querySelector(sel);

  // Render Chart.js growth chart
  async function renderGrowthChart(){
    try{
      const res = await fetch('./_data/sample-stats.json');
      const data = await res.json();
      const ctx = document.getElementById('growthChart');
      if(!ctx) return;
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: '关注趋势（示例）',
            data: data.values,
            borderColor: 'rgba(124,58,237,0.9)',
            backgroundColor: 'linear-gradient(90deg, rgba(124,58,237,0.12), rgba(14,165,164,0.06))',
            tension: 0.28,
            pointRadius: 4,
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgba(124,58,237,0.9)'
          }]
        },
        options: {
          responsive: true,
          plugins:{
            legend:{display:false}
          },
          scales: {
            x: {grid:{display:false}},
            y: {grid:{color:'rgba(15,23,42,0.04)'}}
          }
        }
      });
    }catch(err){
      console.error('Failed to render chart',err);
    }
  }

  // Try to fetch GitHub repo summary for soar1233/ai-guide (public)
  async function fetchGithubSummary(){
    const targetRepo = 'soar1233/ai-guide';
    try{
      const resp = await fetch(`https://api.github.com/repos/${targetRepo}`);
      if(!resp.ok) throw new Error('not-found');
      const repo = await resp.json();
      // create a small stats card if found
      const node = document.createElement('div');
      node.className = 'card stats';
      node.innerHTML = `
        <h3>仓库简况</h3>
        <ul>
          <li>⭐ Stars: ${repo.stargazers_count}</li>
          <li>🍴 Forks: ${repo.forks_count}</li>
          <li>🐞 Open issues: ${repo.open_issues_count}</li>
        </ul>
        <a class="btn small" href="${repo.html_url}" target="_blank">查看仓库</a>
      `;
      const heroRight = document.querySelector('.hero-right');
      if(heroRight) heroRight.prepend(node);
    }catch(err){
      // ignore if repo not present or rate-limited; keep site functional
      console.info('GitHub repo summary not available or rate-limited.');
    }
  }

  // Init
  await renderGrowthChart();
  await fetchGithubSummary();
})();
