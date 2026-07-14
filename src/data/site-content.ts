export type NavItem = {
   name: string;
   href: string;
   hasPage: boolean;
};

export type ProductSummary = {
   image: string;
   title: string;
   desc: string;
};

export type ProductVariant = {
   code: string;
   name: string;
   image: string;
};

export type ProductCategory = {
   id: string;
   title: string;
   description: string;
   categoryImage: string;
   products: ProductVariant[];
};

export const siteContent = {
   brand: {
      name: "Green Landscape",
      shortName: "GREEN LANDSCAPE",
      tagline: "Build Today, Protect Tomorrow",
      footerTitle: "Green Landscape - Ngoại Thất Xanh",
      positioning: "Vật liệu gỗ nhựa ngoài trời từ HDPE tái chế.",
      heroAlt: "Vật liệu ngoại thất xanh Green Landscape",
      logoAlt: "Green Landscape Logo",
   },
   contact: {
      phone: "038 579 7981",
      phoneHref: "0385797981",
      email: "greenlandscape.g40@gmail.com",
      address: "Hòa Lạc, Hà Nội, Việt Nam",
      zaloUrl: "https://zalo.me/0385797981",
   },
   navigation: [
      { name: "Trang chủ", href: "/", hasPage: true },
      { name: "Về chúng tôi", href: "/about", hasPage: true },
      { name: "Sản phẩm", href: "/products", hasPage: true },
      { name: "Tin tức", href: "/news", hasPage: false },
   ] satisfies NavItem[],
   home: {
      hero: {
         eyebrow: "Build Today, Protect Tomorrow",
         title: "Vật liệu ngoại thất xanh cho công trình bền vững",
         description:
            "Green Landscape mang đến giải pháp gỗ nhựa ngoài trời từ HDPE tái chế kết hợp bột gỗ, giúp không gian ngoại thất giữ được vẻ đẹp tự nhiên của gỗ, đồng thời tăng độ bền, khả năng chịu thời tiết và giảm phụ thuộc vào gỗ tự nhiên.",
         primaryCta: "Khám phá sản phẩm",
         secondaryCta: "Nhận tư vấn",
      },
      features: [
         {
            title: "Vật liệu tái chế",
            desc: "Thân thiện môi trường",
         },
         {
            title: "Bền bỉ vượt trội",
            desc: "Chống ẩm mốc, mối mọt",
         },
         {
            title: "Chất lượng cao cấp",
            desc: "Tiêu chuẩn quốc tế",
         },
      ],
      problems: {
         title: "Ngoại thất đẹp không chỉ là lúc mới hoàn thiện",
         description:
            "Vật liệu ngoài trời cần chịu nắng, mưa, độ ẩm và tần suất sử dụng trong thời gian dài. Vì vậy, lựa chọn vật liệu không chỉ dừng lại ở màu sắc hay kiểu dáng, mà còn nằm ở độ bền, khả năng bảo trì và sự phù hợp với xu hướng công trình xanh.",
         items: [
            {
               title: "Dễ mục, mối mọt",
               desc: "Gỗ tự nhiên dễ mục, mối mọt và cần bảo dưỡng định kỳ.",
               tone: "warm",
            },
            {
               title: "Dễ trơn trượt, xuống màu",
               desc: "Một số vật liệu dễ nóng, trơn trượt hoặc xuống màu khi đặt ngoài trời.",
               tone: "green",
            },
            {
               title: "Chi phí bảo trì cao",
               desc: "Chi phí sửa chữa và thay thế có thể tăng cao sau thời gian sử dụng.",
               tone: "green",
            },
            {
               title: "Nhu cầu vật liệu xanh",
               desc: "Công trình xanh cần vật liệu bền hơn, ít lãng phí hơn và thân thiện hơn với môi trường.",
               tone: "green",
            },
         ],
      },
      productIntro: {
         title: "Green Landscape giới thiệu bộ ba sản phẩm ngoại thất",
         products: [
            {
               image: "/home/sannha.png",
               title: "SÀN GỖ NGOÀI TRỜI",
               desc: "Cho ban công, sân vườn, hồ bơi, lối đi ngoài trời.",
            },
            {
               image: "/home/helancan.png",
               title: "HỆ LAN CAN",
               desc: "Hướng đến sự chắc chắn, an toàn và hài hòa với cảnh quan.",
            },
            {
               image: "/home/optuong.png",
               title: "ỐP TƯỜNG NGOÀI TRỜI",
               desc: "Hoàn thiện bề mặt tường, khu vực sân vườn hoặc không gian thương mại ngoài trời.",
            },
         ] satisfies ProductSummary[],
      },
      whyChoose: {
         title: "Vì sao nên chọn Green Landscape?",
         imageAlt: "Vì sao nên chọn Green Landscape",
         reasons: [
            {
               title: "Bền bỉ trong điều kiện ngoài trời",
               desc: "Sản phẩm được thiết kế cho các khu vực thường xuyên tiếp xúc với nắng, mưa và độ ẩm.",
            },
            {
               title: "Hạn chế mối mọt, mục nát",
               desc: "Cấu tạo gỗ nhựa giúp giảm các vấn đề thường gặp của gỗ tự nhiên khi sử dụng ngoài trời.",
            },
            {
               title: "Giữ vẻ đẹp tự nhiên của gỗ",
               desc: "Bề mặt sản phẩm mang cảm giác ấm, gần gũi và phù hợp với nhiều phong cách cảnh quan.",
            },
            {
               title: "Dễ vệ sinh, tiết kiệm bảo trì",
               desc: "Phù hợp với gia đình, quán cà phê, nhà hàng, khách sạn, resort và các khu vực có tần suất sử dụng cao.",
            },
            {
               title: "Góp phần giảm rác thải nhựa",
               desc: "Việc sử dụng nhựa và bột gỗ tái chế giúp Green Landscape hướng đến mô hình vật liệu tuần hoàn và thân thiện hơn với môi trường.",
            },
         ],
      },
      partnership: {
         label: "Hợp tác cùng phát triển",
         title: "Cùng Green Landscape mở rộng giải pháp vật liệu ngoại thất xanh",
         paragraphs: [
            "Green Landscape hợp tác với các đại lý vật liệu xây dựng, đơn vị thi công, nhà thầu cảnh quan và đối tác phân phối có cùng định hướng phát triển vật liệu bền vững.",
            "Đối tác đại lý được hỗ trợ thông tin sản phẩm, catalogue, bảng mẫu, chính sách giá sỉ và tư vấn kỹ thuật để giới thiệu sản phẩm đến khách hàng cuối một cách rõ ràng hơn.",
         ],
         cta: "Đăng ký trở thành đại lý",
      },
      cta: {
         title: "Chưa biết vật liệu có hợp với không gian của bạn?",
         paragraphs: [
            "Việc chọn vật liệu ngoại thất không nên chỉ dựa trên hình ảnh mẫu. Mỗi ban công, sân vườn, hồ bơi hay công trình thương mại đều có điều kiện sử dụng và phong cách thiết kế khác nhau.",
            "Green Landscape hỗ trợ khách hàng xem mẫu sản phẩm, nhận tư vấn theo từng hạng mục và có thể mô phỏng hình ảnh vật liệu trong không gian thực tế để dễ hình dung trước khi lựa chọn.",
         ],
         cta: "Nhận tư vấn ngay",
      },
   },
   about: {
      logoAlt: "Green Landscape Logo Tagline",
      vision: {
         title: "Tầm nhìn",
         quote: "Trong 5–10 năm tới, Green Landscape hướng đến trở thành thương hiệu vật liệu gỗ nhựa ngoại thất đáng tin cậy tại Việt Nam.",
         description:
            "Thông qua các sản phẩm bền đẹp được tạo nên từ nguyên liệu tái chế, chúng tôi mong muốn góp phần đưa vật liệu thân thiện với môi trường trở thành lựa chọn quen thuộc trong các công trình và không gian sống hiện đại.",
      },
      mission: {
         title: "Sứ mệnh",
         items: [
            {
               title: "Với môi trường",
               desc: "Green Landscape góp phần đưa nhựa HDPE đã qua sử dụng trở lại vòng đời mới, tạo nên những sản phẩm có độ bền cao và thời gian sử dụng lâu dài. Qua đó, chúng tôi hướng đến việc giảm lượng rác thải nhựa và hạn chế nhu cầu sử dụng gỗ tự nhiên trong các công trình ngoài trời.",
            },
            {
               title: "Với khách hàng",
               desc: "Chúng tôi mang đến các giải pháp vật liệu ngoại thất có vẻ đẹp gần gũi với gỗ tự nhiên, đồng thời phù hợp hơn với điều kiện sử dụng ngoài trời. Sản phẩm được phát triển theo hướng bền chắc, dễ chăm sóc, hạn chế trơn trượt, mối mọt, cong vênh và phai màu.",
            },
            {
               title: "Với cộng đồng",
               desc: "Green Landscape mong muốn lan tỏa những lựa chọn tiêu dùng có trách nhiệm, khuyến khích việc tái sử dụng tài nguyên và góp phần thúc đẩy mô hình kinh tế tuần hoàn tại Việt Nam.",
            },
         ],
      },
      coreValues: {
         title: "Giá Trị Cốt Lõi",
         description:
            "Green Landscape xây dựng và phát triển dựa trên bốn giá trị cốt lõi, là kim chỉ nam cho mọi hoạt động kinh doanh và định hướng sản phẩm của chúng tôi.",
         items: [
            {
               title: "Trách nhiệm với môi trường",
               desc: "Yếu tố môi trường được Green Landscape cân nhắc trong từng giai đoạn, từ lựa chọn nguyên liệu, tổ chức sản xuất đến hoàn thiện sản phẩm. Chúng tôi ưu tiên sử dụng tài nguyên hiệu quả, giảm chất thải và nâng cao khả năng tái sử dụng của vật liệu.",
            },
            {
               title: "Chất lượng là ưu tiên",
               desc: "Vật liệu tái chế vẫn có thể tạo nên những sản phẩm bền đẹp và có giá trị sử dụng lâu dài. Green Landscape chú trọng kiểm soát chất lượng để sản phẩm có khả năng chịu lực tốt, hạn chế mối mọt, cong vênh và phù hợp với môi trường ngoài trời.",
            },
            {
               title: "Không ngừng đổi mới",
               desc: "Chúng tôi liên tục nghiên cứu và cải tiến sự kết hợp giữa nhựa HDPE tái chế, bột gỗ và các thành phần phụ trợ. Sự đổi mới còn được thể hiện qua màu sắc, bề mặt và kiểu dáng sản phẩm, nhằm đáp ứng đa dạng nhu cầu thiết kế của khách hàng.",
            },
            {
               title: "Phát triển bền vững",
               desc: "Green Landscape hướng đến những giá trị lâu dài cho tất cả các bên: sản phẩm bền vững cho khách hàng, cơ hội hợp tác ổn định cho đối tác và môi trường làm việc an toàn, tích cực cho đội ngũ nhân sự.",
            },
         ],
      },
   },
   productsPage: {
      hero: {
         title: "Sản Phẩm",
         description:
            "Giải pháp vật liệu ngoại thất xanh, bền vững và tinh tế cho mọi không gian kiến trúc.",
      },
      categories: [
         {
            id: "tam-op-tuong",
            title: "Tấm Ốp Tường Gỗ Nhựa",
            description:
               "Tấm ốp tường gỗ nhựa Green Landscape mang vẻ đẹp gần gũi của gỗ tự nhiên, đồng thời được phát triển để phù hợp với điều kiện sử dụng ngoài trời. Sản phẩm có thể ứng dụng cho mặt tiền, ban công, tường bao, biệt thự, nhà hàng, quán cà phê và khu nghỉ dưỡng.\nBề mặt vân gỗ giúp tạo điểm nhấn cho công trình và dễ kết hợp với nhiều phong cách kiến trúc. Vật liệu có độ ổn định cao, hạn chế mối mọt, cong vênh và giảm công việc chăm sóc so với gỗ tự nhiên.",
            categoryImage: "/products/tap_op_tuong_go_nhua/category.jpg",
            products: [
               {
                  code: "G40-OP01",
                  name: "Tấm ốp tường",
                  image: "/products/tap_op_tuong_go_nhua/G40-OP01.jpg",
               },
               {
                  code: "G40-OP02",
                  name: "Tấm ốp tường",
                  image: "/products/tap_op_tuong_go_nhua/G40-OP02.jpg",
               },
               {
                  code: "G40-OP03",
                  name: "Tấm ốp tường",
                  image: "/products/tap_op_tuong_go_nhua/G40-OP03.jpg",
               },
            ],
         },
         {
            id: "san-go-nhua-1-lop",
            title: "Sàn Gỗ Nhựa 1 Lớp",
            description:
               "Sàn gỗ nhựa 1 lớp Green Landscape có kết cấu đồng nhất, kết hợp giữa bột gỗ và nhựa để tạo nên bề mặt mang cảm giác tự nhiên, chắc chắn và phù hợp với nhiều không gian ngoại thất.\nSản phẩm có thể sử dụng cho ban công, sân vườn, khu vực quanh hồ bơi, lối đi, công viên, nhà hàng, quán cà phê và các công trình cảnh quan. Đây là lựa chọn phù hợp với những công trình muốn cân bằng giữa tính thẩm mỹ, công năng và chi phí đầu tư.",
            categoryImage: "/products/san_go_nhu_1_lop/category.jpg",
            products: [
               {
                  code: "G40-PP01",
                  name: "Sàn gỗ nhựa 1 lớp",
                  image: "/products/san_go_nhu_1_lop/G40-PP01.jpg",
               },
               {
                  code: "G40-PP02",
                  name: "Sàn gỗ nhựa 1 lớp",
                  image: "/products/san_go_nhu_1_lop/G40-PP02.jpg",
               },
               {
                  code: "G40-PP03",
                  name: "Sàn gỗ nhựa 1 lớp",
                  image: "/products/san_go_nhu_1_lop/G40-PP03.jpg",
               },
            ],
         },
         {
            id: "san-go-nhua-2-lop",
            title: "Sàn Gỗ Nhựa 2 Lớp (Capstock)",
            description:
               "Capstock là dòng gỗ nhựa có cấu tạo hai lớp, gồm phần lõi composite bên trong và lớp bảo vệ bao phủ bề mặt bên ngoài. Cấu trúc này giúp tăng khả năng bảo vệ sản phẩm trước tác động của thời tiết, sự mài mòn và các yếu tố thường gặp trong môi trường ngoại thất.\nSàn gỗ nhựa 2 lớp Green Landscape phù hợp với những công trình yêu cầu cao hơn về độ bền, chất lượng bề mặt và tính thẩm mỹ. Sản phẩm có thể ứng dụng tại ban công, sân vườn, hồ bơi, công viên, lối đi, cầu cảng, biệt thự, khu nghỉ dưỡng và các không gian thương mại ngoài trời.",
            categoryImage: "/products/san_go_nhu_2_lop/category.jpg",
            products: [
               {
                  code: "G40-CD01",
                  name: "Sàn gỗ nhựa 2 lớp",
                  image: "/products/san_go_nhu_2_lop/G40-CD01.jpg",
               },
               {
                  code: "G40-CD02",
                  name: "Sàn gỗ nhựa 2 lớp",
                  image: "/products/san_go_nhu_2_lop/G40-CD02.jpg",
               },
            ],
         },
         {
            id: "lan-can-go-nhua",
            title: "Lan Can Gỗ Nhựa",
            description:
               "Lan can gỗ nhựa Green Landscape là giải pháp hoàn thiện dành cho ban công, sân thượng, hành lang, hàng rào và các khu vực cảnh quan ngoài trời. Hệ sản phẩm được kết hợp từ nhiều bộ phận như cột lan can, tay vịn và thanh đỡ, tạo nên kết cấu đồng bộ, chắc chắn và hài hòa với không gian kiến trúc.\nBề mặt mang màu sắc và đường nét gần gũi với gỗ tự nhiên, phù hợp với nhà ở, biệt thự, khu nghỉ dưỡng, nhà hàng, quán cà phê và các công trình cảnh quan. Vật liệu giúp hạn chế những vấn đề thường gặp ở gỗ tự nhiên khi sử dụng ngoài trời và giảm công việc bảo trì trong quá trình sử dụng.",
            categoryImage: "/products/lan_can_go_nhua/category.png",
            products: [
               {
                  code: "G40-105H105",
                  name: "Cột lan can",
                  image: "/products/lan_can_go_nhua/G40-105H105.jpg",
               },
               {
                  code: "G40-68H43",
                  name: "Thanh đỡ lan can",
                  image: "/products/lan_can_go_nhua/G40-68H43.jpg",
               },
               {
                  code: "G40-85.6H75",
                  name: "Tay vịn lan can",
                  image: "/products/lan_can_go_nhua/G40-85.6H75.jpg",
               },
            ],
         },
      ] satisfies ProductCategory[],
   },
};

export function buildSiteKnowledgeBase() {
   const lines: string[] = [
      `Thương hiệu: ${siteContent.brand.name}`,
      `Định vị: ${siteContent.brand.positioning}`,
      `Tagline: ${siteContent.brand.tagline}`,
      `Liên hệ: Hotline/Zalo ${siteContent.contact.phone}; Email ${siteContent.contact.email}; Địa chỉ ${siteContent.contact.address}.`,
      "Các trang có nội dung hiện tại: Trang chủ (/), Về chúng tôi (/about), Sản phẩm (/products).",
      "Các mục Ứng dụng (/applications) và Tin tức (/news) có trong điều hướng nhưng chưa có nội dung page trong website.",
      "",
      "Trang chu:",
      siteContent.home.hero.title,
      siteContent.home.hero.description,
      `Vấn đề khách hàng: ${siteContent.home.problems.description}`,
      ...siteContent.home.problems.items.map((item) => `- ${item.title}: ${item.desc}`),
      `Lý do chọn Green Landscape: ${siteContent.home.whyChoose.reasons.map((item) => `${item.title} - ${item.desc}`).join("; ")}`,
      `Hợp tác đại lý: ${siteContent.home.partnership.paragraphs.join(" ")}`,
      `Tư vấn: ${siteContent.home.cta.paragraphs.join(" ")}`,
      "",
      "Về chúng tôi:",
      `Tầm nhìn: ${siteContent.about.vision.quote} ${siteContent.about.vision.description}`,
      `Sứ mệnh: ${siteContent.about.mission.items.map((item) => `${item.title}: ${item.desc}`).join(" ")}`,
      `Giá trị cốt lõi: ${siteContent.about.coreValues.items.map((item) => `${item.title}: ${item.desc}`).join(" ")}`,
      "",
      "San pham:",
   ];

   for (const category of siteContent.productsPage.categories) {
      lines.push(
         `${category.title}: ${category.description.replace(/\n/g, " ")}`,
         `Ma san pham: ${category.products.map((product) => `${product.code} (${product.name})`).join(", ")}`,
      );
   }

   return lines.join("\n");
}
