import * as React from "react";
import { BlurFade } from "@/components/magicui/blur-fade";

const waveAnim = {
  animation: "waveMove 6s ease-in-out infinite alternate"
};

const waveAnim2 = {
  animation: "waveMove 3s ease-in-out infinite alternate"
};

const style = `
@keyframes waveMove {
  0% { transform: translateY(0px); }
  100% { transform: translateY(-15px); }
}
`;

const WavesHaikeiMobile = (props: React.SVGProps<SVGSVGElement>) => (
  <>
    <style>{style}</style>
    <BlurFade inView delay={0.2} direction="up">
      <svg
        id="visual"
        viewBox="0 0 390 844"
        width="390"
        height="844"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        {...props}
      >
        <g style={waveAnim}>
          <path
            d="M0 500L20 500C40 500 80 500 120 510C160 520 200 540 240 540.6C280 541.2 320 520.6 360 516.8L390 513L390 844L360 844C320 844 280 844 240 844C200 844 160 844 120 844C80 844 40 844 20 844L0 844Z"
            fill="#3ca9d2"
          />
          <path
            d="M0 600L20 610C40 620 80 640 120 645C160 650 200 640 240 630C280 620 320 610 360 615L390 620L390 844L360 844C320 844 280 844 240 844C200 844 160 844 120 844C80 844 40 844 20 844L0 844Z"
            fill="#1389c0"
          />
        </g>
        <g style={waveAnim2}>
          <path
            d="M0 700L20 695C40 690 80 680 120 682C160 684 200 698 240 700C280 702 320 692 360 690L390 688L390 844L360 844C320 844 280 844 240 844C200 844 160 844 120 844C80 844 40 844 20 844L0 844Z"
            fill="#0069ab"
          />
          <path
            d="M0 750L20 755C40 760 80 770 120 766C160 762 200 744 240 740C280 736 320 746 360 748L390 750L390 844L360 844C320 844 280 844 240 844C200 844 160 844 120 844C80 844 40 844 20 844L0 844Z"
            fill="#024992"
          />
          <path
            d="M0 800L20 802C40 804 80 808 120 806C160 804 200 796 240 794C280 792 320 794 360 796L390 798L390 844L360 844C320 844 280 844 240 844C200 844 160 844 120 844C80 844 40 844 20 844L0 844Z"
            fill="#172875"
          />
        </g>
      </svg>
    </BlurFade>
  </>
);

export default WavesHaikeiMobile;
