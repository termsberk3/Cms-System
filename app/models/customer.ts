import mongoose, { Schema } from "mongoose";

mongoose.Types.ObjectId.isValid('your id here');

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

interface ICustomer {
    fullName: string;
    email: string;
    user: any;
    userName: any;
}

const customerSchema: Schema<ICustomer> = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'Admins' },
        userName: { type: Schema.Types.String, ref: 'Admins' }
    },
    {
        timestamps: true,
    }
);

const Customer = mongoose.models.Customers || mongoose.model<ICustomer>("Customers", customerSchema);

export default Customer;

