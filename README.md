# Asaas App

## Project Overview

Asaas App is a React Native application built with Expo, designed to manage members and donations for organizations. The primary functions of the app include adding new members, recording monthly donations, and sending donation receipts via SMS.

## Features

- **Add Member:** Users can add new members to the organization by providing necessary information such as name, contact details, etc.

- **Add Monthly Donation:** Users can record monthly donations made by members. They can specify the amount and the member making the donation.

- **Send Donation Receipt:** Once a donation is recorded, the app automatically generates a receipt and sends it to the member via SMS.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/RameesJahan/asaas-app.git
   ```

2. Navigate to the project directory:
   ```
   cd Asaas-App
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Start the Expo development server:
   ```
   npm start
   ```

2. Open the Expo Go app on your mobile device.
   
3. Scan the QR code displayed in the terminal or web browser to open the app.

4. Follow the on-screen instructions to navigate through the app and utilize its features.

## Technologies Used

- React Native with Expo
- SMS API (for sending donation receipts via SMS)
- AsyncStorage (for local storage of member and donation data)
