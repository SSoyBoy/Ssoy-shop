import { useContext } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Background from "../components/Background";
import { ShopContext } from "../context/ShopContext";

const About = () => {
  const { theme } = useContext(ShopContext);
  return (
    <>
      <Background bg_image={assets.about_hero_bg} title={"Về Chúng Tôi"} />
      <div className="px-4 md:px-16 lg:px-24">
        <div className="my-10 flex flex-col lg:flex-row gap-16">
          <img
            className="w-full rounded-md lg:max-w-[450px]"
            src={assets.about_img}
            alt=""
          />
          <div
            className={`flex flex-col justify-center gap-6 lg:w-2/4 ${
              theme === "light" ? "text-[#444]" : "text-[#999696]"
            }`}
          >
            <p>
              SSoy được ra đời từ niềm đam mê sáng tạo và mong muốn cách mạng
              hóa trải nghiệm mua sắm trực tuyến. Hành trình của chúng tôi bắt
              đầu với một ý tưởng đơn giản: tạo ra một nền tảng nơi khách hàng
              có thể dễ dàng khám phá, tìm hiểu và mua sắm đa dạng các sản phẩm
              ngay tại nhà.
            </p>
            <p>
              Kể từ khi thành lập, chúng tôi đã nỗ lực không ngừng để lựa chọn
              kỹ lưỡng các sản phẩm chất lượng cao, phù hợp với mọi sở thích và
              nhu cầu. Từ thời trang, làm đẹp đến điện tử và đồ gia dụng, chúng
              tôi cung cấp một bộ sưu tập phong phú từ các thương hiệu và nhà
              cung cấp đáng tin cậy.
            </p>
            <b className={theme === "light" ? "text-black" : "text-white"}>
              Our Mission
            </b>
            <p>
              Sứ mệnh của chúng tôi Sứ mệnh của SSoy là mang đến cho khách hàng
              sự lựa chọn, tiện lợi và an tâm. Chúng tôi cam kết mang đến một
              trải nghiệm mua sắm liền mạch, vượt trên mong đợi, từ lúc duyệt
              sản phẩm, đặt hàng cho đến khi giao hàng và sau đó.
            </p>
          </div>
        </div>
        <div className="text-4xl py-4">
          <Title text1={"TẠI SAO"} text2={"CHỌN CHÚNG TÔI"} />
        </div>
        <div className="flex flex-col md:flex-row text-sm py-8 sm:py-20">
          <div className="border px-10 md:px-12 py-8 flex flex-col gap-5">
            <b>Đảm bảo Chất lượng:</b>
            <p className={theme === "light" ? "text-[#444]" : "text-[#999696]"}>
              Chúng tôi chọn lọc và kiểm định từng sản phẩm một cách tỉ mỉ để
              đảm bảo đáp ứng các tiêu chuẩn chất lượng nghiêm ngặt.
            </p>
          </div>
          <div className="border px-10 md:px-12 py-8 flex flex-col gap-5">
            <b>Tiện lợi:</b>
            <p className={theme === "light" ? "text-[#444]" : "text-[#999696]"}>
              Với giao diện thân thiện và quy trình đặt hàng nhanh chóng, mua
              sắm chưa bao giờ dễ dàng đến thế.
            </p>
          </div>
          <div className="border px-10 md:px-12 py-8 flex flex-col gap-5">
            <b>Dịch vụ Khách hàng Xuất sắc:</b>
            <p className={theme === "light" ? "text-[#444]" : "text-[#999696]"}>
              Đội ngũ chuyên nghiệp tận tâm của chúng tôi luôn sẵn sàng hỗ trợ
              bạn, đặt sự hài lòng của bạn là ưu tiên hàng đầu.
            </p>
          </div>
        </div>
      </div>
      <NewsletterBox />
    </>
  );
};

export default About;
