<template>
  <div id="home">
    <!-- Header -->
    <header class="header" ref="homeRef">
      <div class="container_center container_content">
        <div class="logo">
          <img :src="LOGO" class="img" />
        </div>

        <div class="btn-container">
          <span
            v-for="item in navs"
            :key="item.name"
            class="btn cursor"
            @click="goTo(item.name)"
          >{{ item.label }}</span>

          <span class="btn btn-down cursor" @click="downApp">
            <span>App下载</span>
            <div class="qrcode" ref="headerQrcode"></div>
          </span>
        </div>
      </div>
    </header>

    <!-- Home Content -->
    <section class="home-content container_center" ref="homeRef">
      <div>
        <div class="title-logo">INTRODUCING HUNTER TRADES</div>
        <h3 class="title">Hunter trades智能交易策略系统</h3>
        <p class="dec">无需盯盘，高准确率，让盈利更简单</p>
        <div class="btn-container">
          <span class="btn">购买会员</span>
          <span class="btn right_btn">免费试用</span>
        </div>
      </div>

      <div class="trades">
        <p class="text">支持交易所</p>
        <div class="trades_items">
          <img
            v-for="item in trades"
            :key="item.name"
            :src="item.img"
            class="item"
          />
        </div>
      </div>
    </section>

    <!-- Trade Records -->
    <section class="trade_records container_center" ref="systemRef">
      <div class="trade_list" />
      <div class="trade_dec">
        <Button class="btn">交易信号</Button>
        <div class="title">
          <p>不同行情下</p>
          <p>APP推送不同的信号</p>
        </div>

        <div class="detail">
          <p class="first">包括买入通知、止盈止损、风险提示、交易关闭等信号。</p>
          <p>不同色块代表不同信号类型，用户跟单操作一目了然。</p>
        </div>
      </div>
    </section>

    <!-- Advantage -->
    <section class="container_center advantage" ref="advanceRef">
      <h3 class="title">如何高效捕捉交易机会？</h3>

      <div class="advantage_container">
        <div class="advantage_item first">
          <div class="left margin_top_100">
            <div class="btn_container">
              <Button class="btn">
                <span class="weight">24小时</span><span>连续推送</span>
              </Button>
            </div>

            <div class="advantage_dec">
              <p>依靠专业、完善的交易策略,</p>
              <p>
                <span>Hunter trades 交易系统能够</span>
                <span class="white">24小时</span>
                <span>不间断地跟踪现货、合约、</span>
              </p>
              <p>杠杆代币的市场走势,帮助用户发现足够多的潜在交易机会。</p>
            </div>
            <div class="learn_more"></div>
          </div>

          <div class="right logo_img" />
        </div>

        <!-- Similar structure for other advantage items -->
      </div>
    </section>

    <!-- Buy Member -->
    <section class="buy_member" ref="buyRef">
      <div class="container_center container">
        <div class="buy item">
          <div class="member_price title">会员 2000u / 年</div>
          <div class="line" />

          <div class="dec">
            <p class="text">高准确率信号推送</p>
            <p class="text">针对会员的强势币种推荐</p>
            <p class="text">大盘分析以及风险提示</p>
          </div>

          <div class="learn_more">更多其他会员权益</div>

          <div class="btn cursor" @click="show = true">购买会员</div>
        </div>

        <div class="experience item">
          <div class="title">7天体验 免费申请</div>
          <div class="line" />

          <div class="dec">
            <p class="text">在官网页面下载手机APP（安卓）</p>
            <p class="text">注册Hunter trades 账户</p>
            <p class="text last">完成账户注册之后，添加客服微信，咨询免费试用细节</p>
          </div>

          <div class="kefu">
            <img :src="KEFU" class="img" />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <section class="footer">
      <div class="container_center">
        <div class="htrade_app">
          <div class="htrade flex">
            <img :src="H_LOGO" class="logo" />
            <div class="htrade_text">
              <h6>APP下载</h6>
              <p>下载Hunter trades 移动APP 随时随地接收交易信号</p>
            </div>
          </div>

          <div class="app_down flex">
            <div ref="qrCode" />
            <p>扫码下载</p>
            <img :src="APK" @click="downApp" class="cursor" />
            <p @click="downApp" class="cursor">点击下载APK</p>
          </div>
        </div>

        <div class="footer_btn_container">
          <span
            v-for="item in navs"
            :key="item.name"
            class="btn cursor"
            @click="goTo(item.name)"
          >{{ item.label }}</span>
        </div>

        <p class="footer_text">© 2020 Hunter trades App. All Rights Reserved.</p>
      </div>
    </section>

    <!-- Modal -->
    <a-modal v-model:visible="show" title="客服微信" :footer="null">
      <div>
        <img :src="KEFU" />
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import Button from '@src/h-off/components/Button.vue';
import LOGO from './images/icon-logo.png';
import BIANCE from './images/logo-biance.png';
import HUOBI from './images/logo-huobi.png';
import FTX from './images/logo-ftx.png';
import OK from './images/logo-ouyi_03.png';
import KEFU from './images/kefu.jpg';
import H_LOGO from './images/Huntericon.png';
import APK from './images/apk.png';
import api from "@src/h-off/config/api";
import { fetch } from '@utils/index';
import '@utils/lib/qrcode';

declare const QRCode: any;

const trades = [
  { img: BIANCE, name: 'biance' },
  { img: HUOBI, name: 'huobi' },
  { img: FTX, name: 'ftx' },
  { img: OK, name: 'ok' }
];

const navs = [
  { name: 'home', label: '首 页' },
  { name: 'system', label: '系统介绍' },
  { name: 'advance', label: '产品优势' },
  { name: 'buy', label: '购买会员' }
];

// Refs
const homeRef = ref<HTMLElement | null>(null);
const systemRef = ref<HTMLElement | null>(null);
const advanceRef = ref<HTMLElement | null>(null);
const buyRef = ref<HTMLElement | null>(null);
const qrCode = ref<HTMLElement | null>(null);
const headerQrcode = ref<HTMLElement | null>(null);

// State
const info = ref({
  downUrl: '',
  qrUrl: ''
});
const show = ref(false);

// Methods
const downApp = async () => {
  if (!info.value.downUrl) {
    message.warning('系统故障， 请刷新后重新下载');
    return;
  }
  window.location.href = info.value.downUrl;
};

const getData = async () => {
  try {
    const res = await fetch.get(api.system_settings);
    const { data = [] } = res;
    let host = '';
    let apiUrl = '';
    
    data.forEach((it: any) => {
      if (it.key === "lastest_version_url") {
        apiUrl = it.url;
      }
      if (it.key === "host") {
        host = it.value;
      }
    });

    if (!host || !apiUrl) {
      message.error('获取下载地址失败，请稍后重试');
      return;
    }

    const downUrl = `${host}${apiUrl}`;
    info.value = {
      qrUrl: '',
      downUrl
    };

    if (qrCode.value && headerQrcode.value) {
      new QRCode(qrCode.value, {
        text: downUrl,
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });

      new QRCode(headerQrcode.value, {
        text: downUrl,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  } catch (error) {
    message.error('系统错误，请稍后重试');
  }
};

const goTo = (type: string) => {
  const refMap = {
    home: homeRef,
    system: systemRef,
    advance: advanceRef,
    buy: buyRef
  };
  
  const element = refMap[type as keyof typeof refMap].value;
  if (element) {
    const top = element.offsetTop - 20;
    window.scrollTo(0, top);
  }
};

// Lifecycle
onMounted(() => {
  getData();
});
</script>

<style lang="less" scoped>
@import './index.less';
</style> 