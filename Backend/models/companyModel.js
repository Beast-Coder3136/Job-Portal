import mongoose, {Schema} from "mongoose";

const companySchema = new Schema({
  name : {
    type : String,
    required : true,
  },
  description : {
    type : String,
  },
  website  : {
    type : String,
  },
  location : {
    type : String,
  },
  logo : {
    type : String,
  },
  UserId : {
    type : Schema.Types.ObjectId,
    ref : 'User',
    required : true
  }
}, {timestamps : true})

const Company = mongoose.model('Company',companySchema);

export default Company;