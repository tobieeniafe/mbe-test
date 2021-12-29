const fs = require('fs');

const FILE_LOCATION = './phoneBook.json';

const getListOfPhoneNumbers = async (isCalled = true) => {
  return new Promise((resolve, reject) => {
    fs.readFile(FILE_LOCATION, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const phoneNumbers = JSON.parse(data);

        if (!isCalled) {
          console.table(phoneNumbers);
        }
        resolve(phoneNumbers);
      }
    });
  });
};

const getPhoneDetailsByNumber = ({ phoneNumber, isCalled = true }) => {
  return getListOfPhoneNumbers().then((phoneBook) => {
    const numberInfo = phoneBook.find(
      (phoneBook) => phoneBook.phone === phoneNumber
    );

    if (!isCalled) {
      console.table([numberInfo]);
    }
    return numberInfo;
  });
};

const addNumberToPhoneBook = ({ name, email, phone }) => {
  getPhoneDetailsByNumber({ phoneNumber: phone }).then((numberInfo) => {
    if (numberInfo) {
      console.log(`${phone} already exists in the phone book`);
    } else {
      getListOfPhoneNumbers().then((phoneBook) => {
        const newNumber = {
          name,
          email,
          phone,
          dateCreated: new Date().toISOString(),
        };
        phoneBook.push(newNumber);
        fs.writeFile(FILE_LOCATION, JSON.stringify(phoneBook), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`${phone} added to the phone book`);
          }
        });
      });
    }
  });
};

getListOfPhoneNumbers(false);
getPhoneDetailsByNumber({ phoneNumber: '08023454332', isCalled: false });
addNumberToPhoneBook({
  name: 'Ben',
  email: 'ben@mail.com',
  phone: '08012345678',
});
addNumberToPhoneBook({
  name: 'admin',
  email: 'admin@mail.com',
  phone: '08023454332',
});
