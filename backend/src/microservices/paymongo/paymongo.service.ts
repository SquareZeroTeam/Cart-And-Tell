import { HttpException, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { CreatePaymongoDto } from './dto/create-paymongo.dto';
import { PrismaService } from 'src/db/prisma/prisma.service';
@Injectable()
export class PaymongoService implements OnModuleInit{
  constructor(private readonly prisma:PrismaService) {}
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
  async checkout(createPaymongoDto:CreatePaymongoDto) {
    createPaymongoDto.data = createPaymongoDto.data.map(item => +item); //Converts to Int
    console.log(createPaymongoDto.data);
    const productItems = await this.prisma.productItem.findMany({where:{id:{in:createPaymongoDto.data}},include:{product:true}});
    const filteredData = productItems.map( item => {
      return {
        name:item.product.name,
        amount:item.product.amount * 100,
        quantity:item.quantity,
        currency:"PHP",
        image:item.product.image,
        // description:item.product.description,
      }
    });
    console.log(filteredData);
    const checkoutData = {
      data:{
        attributes:{
          line_items:filteredData,
          payment_method_types:["card","gcash","paymaya"],
          send_email_receipt:true
        }
      }
    }
    const paymongoRes = await axios.post("https://api.paymongo.com/v1/checkout_sessions",checkoutData,{
      headers:{
        "Content-Type": "application/json",
      },
      auth:{
        username:process.env.PayMongo_Secret_Key,
        password:""
      }
    })
    .then(res => res.data)
    .catch(err => err.response.data);
    return {checkoutLink:paymongoRes.data.attributes.checkout_url}
  }
  async buynow(createPaymongoDto:CreatePaymongoDto) {
    createPaymongoDto.data = createPaymongoDto.data.map(item => +item); //Converts to Int
    console.log(createPaymongoDto.data);
    const productItems = await this.prisma.product.findMany({where:{id:{in:createPaymongoDto.data}}});
    const filteredData = productItems.map( item => {
      return {
        name:item.name,
        amount:item.amount * 100,
        quantity:1,
        currency:"PHP",
        image:item.image,
        // description:item.product.description,
      }
    });
    console.log(filteredData);
    const checkoutData = {
      data:{
        attributes:{
          line_items:filteredData,
          payment_method_types:["card","gcash","paymaya"],
          send_email_receipt:true
        }
      }
    }
    const paymongoRes = await axios.post("https://api.paymongo.com/v1/checkout_sessions",checkoutData,{
      headers:{
        "Content-Type": "application/json",
      },
      auth:{
        username:process.env.PayMongo_Secret_Key,
        password:""
      }
    })
    .then(res => res.data)
    .catch(err => err.response.data);
    return {checkoutLink:paymongoRes.data.attributes.checkout_url}
  }
}
