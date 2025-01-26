# TempMail

## Features

- Generate a random temporary email address.
- Retrieve the list of received emails.
- Read the content of a specific email.
- Wait for a new message with a timeout feature.

## Usage

### Import

```javascript
const TempMail = require('./TempMail');
```

### Example Usage

```javascript
const TempMail = require('./TempMail');

(async () => {
        // Create a temporary email mailbox
        const mailbox = await TempMail.createMailbox();
        console.log(`Generated email address: ${mailbox.email}`);

        // Wait for a new message (default timeout: 60 seconds)
        console.log("Waiting for a new message...");
        const message = await mailbox.waitForMessage();

        // Display the message details
        console.log("Message received!");
        console.log("Content:", message);
})();
```

## Documentation

#### Methods

- **`getMails()`**
  - Description: Fetches the list of received emails in the mailbox.
  - Returns: An array of emails.

- **`fetchMessage(id)`**
  - Description: Fetches the content of a specific email.
  - Parameters:
    - `id`: The email ID.
  - Returns: An object containing the message details.

- **`waitForMessage(timeout)`**
  - Description: Waits for a new message to arrive in the mailbox.
  - Parameters:
    - `timeout` (optional): Maximum wait time (default: 60000 ms).
  - Returns: An object containing the message details or an error if the timeout is exceeded.
