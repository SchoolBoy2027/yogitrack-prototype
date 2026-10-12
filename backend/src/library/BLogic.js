const Customer = require("../models/Customer");

/**
 * BLogic, static business logic class
 */
 
class BLogic {
/**
 * sendAttendanceNotification(customer, attendance)
 * @param {*} customer 
 * @param {*} attendance 
 * @returns 
 */
static async sendAttendanceNotification(customer, attendance) {
    const firstName = customer.fname;
    const classDate = new Date(attendance.start_time);

    const date = classDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    });

    const time = classDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });

    const message = `Hello ${firstName}! You are checked-in for a class on ${date} at ${time}. Your class-balance is ${customer.balance}.`;

    if (process.env.NOTIFICATION_MODE === "simulation") {
        console.log(`Attendance notification for ${customer.customer_id}: ${message}`);
        return;
    }

    if (process.env.NOTIFICATION_MODE !== "real") {
        throw new Error("Invalid NOTIFICATION_MODE setting.");
    }

    if (customer.communication_preference === "Email") {
        await BLogic.sendEmail(customer.email, message);
        return;
    }

    if (customer.communication_preference === "Phone") {
        await BLogic.sendSMS(customer.phone, message);
        return;
    }

    throw new Error(
        "Invalid communication preference for customer: " + customer.customer_id
    );
}

/**
 * sendEmail(email, message)
 * @param {*} email 
 * @param {*} message 
 * @returns 
 */
static async sendEmail(email, message) {
    console.log("send Email", message);
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const result = await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: "YogiTrack Attendance Confirmation",
        text: message
    });

    return result;
}
/**
 * sendSMS(phone, message)
 * @param {*} phone 
 * @param {*} message 
 * @returns 
 */
static async sendSMS(phone, message) {
    console.log("send SMS", message);
    const twilio = require("twilio");

    const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    const result = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
    });

    return result;
}

}

module.exports = BLogic;

