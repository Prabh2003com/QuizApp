

async function ApiData(){
    const response = await fetch('https://opentdb.com/api.php?amount=10');
    const Data = await response.json();
    console.log(Data);
};