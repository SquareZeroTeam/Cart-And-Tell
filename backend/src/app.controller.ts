import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { promisify } from 'util';
import { PrismaService } from './db/prisma/prisma.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private readonly prisma:PrismaService ) {}

  @Get()
  hello() {
    return 'Cart-And-Tell API v1.0.0'
  }
  @Get('throttle')
  async throttle() {
    const delay = promisify(setTimeout);

    // Simulate a delay of 5 seconds
    await delay(5000);

    return { message: 'ok' };
  }
  // @Get('createproducts')
  // async createproducts() {
  //   const products = await fetch('https://fakestoreapi.com/products').then(res => res.json());
  //   console.log(products);
  //   const newMerchant = await this.prisma.merchant.create({data:{
  //     name:"FakeStore API",
  //     website:"https://fakestoreapi.com/",
  //     email:"fakestoreapi@fake.com",
  //     image:"https://fakestoreapi.com/icons/logo.png"
  //   }});
  // //   const filteredProducts = products.map(product => {
  //     return  {
  //       name:product.title,
  //       description:product.description,
  //       amount:product.price*10,
  //       image:product.image,
  //       // merchantId:newMerchant.id
  //     }
  //   });
  //   const newProducts = await this.prisma.merchant.update({
  //     where:{id:newMerchant.id},
  //     data:{
  //       products:{createMany:{data:filteredProducts}}
  //     }
  //   });
  //   return {message: "Successfully Created Mock Products"};
  // }
//   const array = ["Health and Wellness", "Hotels and Resorts", "Aesthetic Clinics", "Insurance [Life & None Life]","Restaurants","Fashion Accessories","Jewelries","Watches","Crafts & Artworks", "Bags", "Apparels", "Gadgets","Musical Instruments","Sports","Paper Goods","Smart Toys","Home & Babies Stuff","Foods","Franchise","Event Needs","Creative Needs","Real Estate", "Professionals","Automobiles"]
// const filteredData = array.map(category => {
//   return {
//     name:category
//   }
// })
}
