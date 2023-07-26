async function getGreeting() {
  const response = await fetch('http://localhost:9000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: 'query { greeting }'
    })
  })
  const {data} = await response.json();
  return data.greeting;
}


const text = document.getElementById('text');

getGreeting()
.finally(() => {
  text.textContent += ' Loading...';
})
.then((response) => {
  setTimeout(() => {
    text.textContent = 'Server say : ' + response
  }, 2000)
})
.catch((err) => {
  text.textContent = 'Server say : ' + err.message
  console.log(err);
})