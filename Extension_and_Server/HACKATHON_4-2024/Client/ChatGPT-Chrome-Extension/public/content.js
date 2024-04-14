async function getData(inputTarget) {
  const response = await fetch(
    "http://127.0.0.1:5000/api/v1/url_check?target=" + inputTarget
  );
  console.log(response);
  const data = await response.json();
  console.log(data.message);
}

const myurllocation = window.location.href;
console.log(myurllocation);
getData(myurllocation);
