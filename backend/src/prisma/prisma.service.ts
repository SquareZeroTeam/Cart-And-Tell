import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()

export class PrismaService extends PrismaClient implements OnModuleInit{
    async onModuleInit() {
        console.log("Prisma is Successfully Initialized");
        await this.$connect();
    }
}


// await db.merchant.create({data:{
//     name:"Cathay Land Inc.",
//     email:"CathaylandInc@gmail.com",
//     website:"https://www.cathaylandinc.com/",
//     image:"https://www.archify.com/files/professional/s/ankxujbb1573788337.jpg",
//     products:{create:{
//         name:"Acienda Designer Outlet",
//         image:"https://www.cathaylandinc.com/wp-content/uploads/2021/07/Acienda-Designer-14-600x480.jpg",
//         amount:50000,
//         description:"A visit to Acienda Designer Outlet is beyond a great shopping experience. It looks like an international trip with family and friends to some of the greatest attractions around the globe.",
//     }}
// }});

// await db.productItem.create({
//     data: {
//         userId:1,
//         quantity:1,
//         productId:1
//     }
// })