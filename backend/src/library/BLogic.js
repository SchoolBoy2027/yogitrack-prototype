const Customer = require("../models/Customer");
const YogaClass = require("../models/Yoga_Class");
const User = require("../models/User");
const Class_Package = require("../models/Class_Package");

/**
 * BLogic, static business logic class
 */
 
class BLogic {

    /**
     * checkExpiredCustomers()
     * Instead of a scheduled task, we're going to assume this is the website way in. 
     * so update on every request and zero out the customer balances when their
     * package expires.    
     * @returns 
     */
    static async checkExpiredCustomers() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const result = await Customer.updateMany(
            {
                end_date: { $lt: today },
                balance: { $gt: 0 }
            },
            {
                $set: { balance: 0 }
            }
        );

        return result.modifiedCount;
    }

    /**
     * buildClassPackageId(package_category, yoga_class_type, number_of_classes) 
     * Senior General 1=SG1, General Special 1= GS1, unlimited is U, but 1000 classes
     * so the math works out.  If a customer tries to take 1000 classes in 3 months, they're
     * going to have a heart attack before the end so its not our problem.   
     * @param {*} package_category 
     * @param {*} yoga_class_type 
     * @param {*} number_of_classes 
     * @returns 
     */
    static async buildClassPackageId(package_category, yoga_class_type, number_of_classes) {
        const category = package_category.charAt(0).toUpperCase();
        const type = yoga_class_type.charAt(0).toUpperCase();
        const classes = number_of_classes === 1000 ? "U" : number_of_classes;

        return `${category}${type}${classes}`;
    }



    /**
     * generateCustomerId() generates a new customer_id
     * CXXXX
     * @returns String
     */
    static async generateCustomerId() {
        const prefix = "C";

        // Count only users with this role
        const customerCount = await Customer.countDocuments();

        // Next number for this role
        const nextNumber = customerCount + 1;

        // Convert to 4 digits
        const numberPart = String(nextNumber).padStart(4, "0");

        // Return 5-character ID
        return prefix + numberPart;
        }


    /**
     * generateUserId(role)
     * @param {*} role Manager or Instructor, Instructors teach classes
     * MXXXX or IXXXX
     * @returns String
     */    
    static async generateUserId(role) {
        let prefix;

        switch (role) {
            case "Manager":
            prefix = "M";
            break;

            case "Instructor":
            prefix = "I";
            break;

            default:
            throw new Error(
                "Invalid role. Must be Manager or Instructor."
            );
        }

        // Count only users with this role
        const userCount = await User.countDocuments({
            role: role
        });

        // Next number for this role
        const nextNumber = userCount + 1;

        // Convert to 4 digits
        const numberPart = String(nextNumber).padStart(4, "0");

        // Return 5-character ID
        return prefix + numberPart;
        }




    /**
     * checkYogaClassOverlap(yogaClass, excludeId = null)
     * @param {*} yogaClass 
     * @param {*} excludeId 
     * @returns 
     */
    static async checkYogaClassOverlap(yogaClass, excludeId = null) {
        const classDate = new Date(yogaClass.yoga_class_date);

        const startOfDay = new Date(classDate);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(startOfDay);
        endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);

        const query = {
            instructor_id: yogaClass.instructor_id,
            yoga_class_date: {
                $gte: startOfDay,
                $lt: endOfDay
            },
            start_time: {
                $lt: new Date(yogaClass.end_time)
            },
            end_time: {
                $gt: new Date(yogaClass.start_time)
            }
        };

        if (excludeId) {
            query.yoga_class_id = { $ne: excludeId };
        }

        const overlappingClass = await YogaClass.findOne(query);

        return overlappingClass;
    }

    /**
     * generateClassId()  Generates a new yoga+class id
     * format starts with a year and is sequential.  
     * @returns yoga_class_id
     */
    static async generateClassId() {
        const year = new Date().getFullYear();

        const count = await YogaClass.countDocuments({
            yoga_class_id: {
                $gte: year * 10000000,
                $lt: (year + 1) * 10000000
            }
        });

        const yoga_class_id = year * 1000000 + count + 1;
        return yoga_class_id;
    }


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

