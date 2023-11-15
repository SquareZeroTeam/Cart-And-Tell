import { HttpException, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymongoService implements OnModuleInit{
    async onModuleInit() {
        await axios.get('https://api.paymongo.com/', {
            auth:{username: process.env.PayMongo_Secret_Key,password:''}
        }).then(() => console.log('PayMongo service authenticated'))
        .catch(error => {
            if (error.response) {
                throw new HttpException(error.response.data.errors[0].code,error.response.status);
            }
            else if (error.request) {
                throw new InternalServerErrorException();
            }
        });
    }
    async createCheckOut(items:Array<any>) { 
        const attributes ={
            "data":{
                "attributes":{
                    "line_items":[
                        {
                            "amount":2000,
                            "currency":"PHP",
                            "name":"something",
                            "quantity":1
                        }
                    ],
                    "send_email_receipt":true,
                    "payment_method_types":["gcash","card"]
                }
            }
        }
        const result = await axios.post("https://api.paymongo.com/v1/checkout_sessions",JSON.stringify(attributes),{
            auth:{username: process.env.PayMongo_Secret_Key,password:''},
            headers: {
                "Content-Type": 'application/json',
            }
        })
        .then(result => result.data)
        .catch(error => error.response.data)
        console.log(result);
    }
}

