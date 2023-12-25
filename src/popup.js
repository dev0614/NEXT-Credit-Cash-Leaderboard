document.getElementById('fetchBalance').addEventListener('click', function() {
    var address = document.getElementById('ethAddress').value;
    if (address) {
        getBalance(address);
    } else {
        document.getElementById('result').innerText = 'Please enter an Ethereum address';
    }
});

function getBalance(address) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "method": "eth_getBalance",
        "params": [address, "latest"],
        "id": 1,
        "jsonrpc": "2.0"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("YOUR_QUICKNODE_ENDPOINT", requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                var balanceInEther = parseInt(data.result, 16) / 1e18;
                var balanceFixed = balanceInEther.toFixed(2)
                document.getElementById('result').innerText = `Balance: ${balanceFixed} ETH`;
            } else {
                document.getElementById('result').innerText = 'Error fetching balance';
            }
        })
        .catch(error => {
            document.getElementById('result').innerText = 'Error fetching balance';
            console.log('error', error);
        });
}