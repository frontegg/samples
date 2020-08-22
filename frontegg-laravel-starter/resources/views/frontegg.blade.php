<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script
        src="https://code.jquery.com/jquery-3.5.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
        crossorigin="anonymous"></script>

    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <title>Frontegg Demo</title>
</head>
<body>
<div class="container">
    <div class="header">
        <h3 class="text-center">Frontegg Test</h3>
    </div>

    <div class="body">

        <div class="form-group">
            <h3>Auth check</h3>
            <button type="button" id="auth-button" class="btn btn-primary" onclick="getAuthToken()">Auth</button>
        </div>

        <hr>

        <div class="form-group">
            <label for="exampleInputTenant">Get Audit</label>
            <input type="email" class="form-control" id="exampleInputTenant" value="tacajob400@icanav.net"
                   disabled>
        </div>
        <button type="button" class="btn btn-primary" onclick="getAuditLogs()">Get Audit Button</button>

        <hr>

        <div class="form-group">
            <form id="send-audit">
                <label for="exampleInputUser">User</label>
                <input type="email" class="form-control" id="exampleInputUser" value="testuser@t.com"
                       disabled>
                <label for="exampleInputResource">Resource</label>
                <input type="text" class="form-control" id="exampleInputResource" value="Portal"
                       disabled>
                <label for="exampleInputAction">Action</label>
                <input type="text" class="form-control" id="exampleInputAction" value="Login"
                       disabled>
                <label for="exampleInputSeverity">Severity</label>
                <input type="text" class="form-control" id="exampleInputSeverity" value="Info"
                       disabled>
                <label for="exampleInputIp">IP</label>
                <input type="text" class="form-control" id="exampleInputIp" value="123.1.2.3"
                       disabled>
            </form>
        </div>
        <button type="button" class="btn btn-primary" onclick="sendAuditLogs()">Send Audit Button</button>

        <hr>

        <div class="response">
            <div class="alert alert-primary" style="word-break: break-word; display: none" role="alert">
            </div>

            <div class="alert alert-danger" style="word-break: break-word; display: none" role="alert">
            </div>

            <table id="audit-log" class="table table-striped">
                <thead>
                <tr>
                </tr>
                </thead>
                <tbody>
                <tr>
                </tr>
                </tbody>
            </table>
        </div>


    </div>
</div>

<script>

    function handleResponse (response) {
        if (!response.ok)  {
            throw Error(response.statusText)
        }
        return response.json()
    }

    class Alert {
        message;

        constructor() {
            this._successAlertDiv = document.querySelector('.alert-primary');
            this._errorAlertDiv = document.querySelector('.alert-danger');

            this._dropExistingAlerts = function () {
                document.querySelectorAll('.alert').forEach((alertItem) => {
                    alertItem.innerHTML = '';
                    alertItem.style.setProperty('display', 'none');
                })
            }
        }

        setMessage(message) {
            this.message = String(message);
            return this;
        }

        fillSuccessAlert() {
            this._dropExistingAlerts();
            this._successAlertDiv.innerHTML = this.message;
            this._successAlertDiv.style.removeProperty('display');
        }

        fillErrorAlert() {
            this._dropExistingAlerts();
            this._errorAlertDiv.innerHTML = this.message;
            this._errorAlertDiv.style.removeProperty('display');
        }
    }

    let alert = new Alert();

    function getAuthToken() {
        fetch('/api/auth')
            .then(response => handleResponse(response))
            .then((data) => {
                alert.setMessage(`Token: ${data.access_token}<br>${data.expires_at.date}`)
                    .fillSuccessAlert()
            })
            .catch(error => alert.setMessage(error).fillErrorAlert())
    }


    function getAuditLogs() {
        const tenantId = document.querySelector('#exampleInputTenant').value;
        fetch(`/api/audits/${tenantId}`)
            .then(response => handleResponse(response))
            .then(({data}) => {
                let keys = Object.getOwnPropertyNames(data[0]);
                let tableHead = keys.map(item => `<th scope="col">${item}</th>`).join('\n');
                let tableBody = '';
                data.forEach(item => {
                    tableBody += '<tr>\n';
                    keys.forEach(key => {
                        tableBody += `<td>${item[key]}</td>\n`;
                    })
                    tableBody += '</tr>\n';
                });

                document.querySelector('#audit-log')
                    .children[0]
                    .children[0]
                .innerHTML = tableHead

                document.querySelector('#audit-log')
                    .children[1]
                .innerHTML = tableBody;

            })
            .catch(error => alert.setMessage(error).fillErrorAlert())

    }


    function sendAuditLogs() {
        const tenantId = document.querySelector('#exampleInputTenant').value;
        let data = {
            user: document.querySelector('#exampleInputUser').value,
            resource: document.querySelector('#exampleInputResource').value,
            action: document.querySelector('#exampleInputAction').value,
            severity: document.querySelector('#exampleInputSeverity').value,
            ip: document.querySelector('#exampleInputIp').value,
        }
        fetch(`/api/audits/${tenantId}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => handleResponse(response))
            .then(data => {
                let message = `Response: <br>`;
                for (let dataKey in data) {
                    message += `${dataKey}: ${data[dataKey]}<br>`
                }
                alert.setMessage(message);
                alert.fillSuccessAlert();
            });
    }

    let tnID = document.querySelector('#exampleInputTenant').value;
    let testData = {'title':'Test title!', 'description': 'Test description'};
    fetch(`/api/triggerEvent/${tnID}/eventKeyForTest`, {
        method: 'POST',
        body: JSON.stringify(testData),
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => {
            if (!response.ok) {
                alert.setMessage('Failed response').fillErrorAlert();
                return;
            }
            alert.setMessage('Success').fillSuccessAlert();

        });

    fetch(`/api/frontegg/${tnID}`)
        .then(response => handleResponse(response))
        .then(({data}) => {console.log(data)});
</script>
</body>
</html>
