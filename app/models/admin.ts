import mongoose, { Schema } from "mongoose";

mongoose.Types.ObjectId.isValid('your id here');

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

interface IAdmin {
    email: string;
    password: string;
    userType: string;
    fullName: string;
}

const adminSchema: Schema<IAdmin> = new Schema(
    {
        email: { type: String, required: true },
        fullName: { type: String, required: true },
        password: { type: String, required: true },
        userType: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;