import React, { useState, useEffect } from 'react';
import { useTranslations } from '@/i18n';

const ScammingBanner = ({ lang }) => {
  const t = useTranslations(lang || '');
  const [isHide, setHide] = useState(true);

  useEffect(() => {
    const hideScammer = localStorage.getItem('hide-scammer');
    if (hideScammer !== 'Y') {
      setHide(false);
    }
  }, []);

  const handleClose = () => {
    setHide(true);
    localStorage.setItem('hide-scammer', 'Y');
  };

  if (isHide === true) {
    return null;
  }

  return (
    <div className="top-0 w-full bg-gradient-to-r from-[#E014B0] to-[#802FF3] text-white p-2 flex justify-between items-center z-50">
      <span className="flex-1 text-center font-bold">
        {t({
          en: (
            <>
              WARNING: YOU MAY BE BEING SCAMMED! <br />
              If you are on the phone with someone you DON'T know AND TRUST who has asked you to install RustDesk,
              <br />
              do not install and hang up immediately. <br />
              They are likely a scammer trying to steal your money or other private information.
            </>
          ),
          fr: (
            <>
              ATTENTION: VOUS POURRIEZ ÊTRE SCAMMÉ! <br />
              Si vous êtes sur la ligne avec quelqu'un que vous ne connaissez pas et qui vous a demandé d'installer
              RustDesk,
              <br />
              ne l'installez pas et coupez immédiatement. <br />
              Ils sont probablement des escrocs qui essaient de voler votre argent ou d'autres informations privées.
            </>
          ),
          de: (
            <>
              WARNUNG: Jemand könnte dich gerade betrügen! <br />
              Wenn du gerade mit jemandem telefonierst, den du nicht kennst und nicht vertraust – und diese Person möchte, dass du RustDesk installierst – dann installiere es nicht und lege sofort auf!
              <br />
	      Mit hoher Wahrscheinlichkeit sind dies Betrüger, die versuchen, dein Geld oder private Informationen zu stehlen.
            </>
          ),
          es: (
            <>
              ADVERTENCIA: PODRÍAS ESTAR SIENDO ESTAFADO! <br />
              Si estás en la llamada con alguien que no conoces y no puedes confiar que te pida instalar RustDesk,
              <br />
              no instales y cuelga inmediatamente. <br />
              Probablemente sean estafadores que intentan robar tu dinero o otra información privada.
            </>
          ),
          pt: (
            <>
              AVISO: VOCÊ PODE ESTAR SENDO ENGANADO! <br />
              Se você está no telefone com alguém que NÃO conhece e CONFIANÇA que pediu para instalar RustDesk,
              <br />
              não instale e desligue imediatamente. <br />
              Eles provavelmente são golpistas tentando roubar seu dinheiro ou outras informações privadas.
            </>
          ),
          'zh-cn': (
            <>
              警告：您可能正在被骗！ <br />
              如果您与您不认识和信任的人通话，并要求您安装 RustDesk，
              <br />
              请勿安装并立即挂断。 <br />
              他们很可能是骗子，试图窃取您的钱或其他私人信息。
            </>
          ),
          'zh-tw': (
            <>
              警告：您可能正在被騙！ <br />
              如果您與您不認識和信任的人通話，並要求您安裝 RustDesk，
              <br />
              請勿安裝並立即掛斷。 <br />
              他們很可能是騙子，試圖竊取您的錢或其他私人信息。
            </>
          ),
          ja: (
            <>
              警告：あなたは騙されているかもしれません！ <br />
              RustDesk をインストールするように頼んだことがない人と電話中である場合、
              <br />
              インストールしないですぐに電話を切断してください。 <br />
              おそらく、あなたのお金や他の個人情報を盗もうとする詐欺師です。
            </>
          ),
          it: (
            <>
              AVVISO: POTRESTI ESSERE TRUFFATO! <br />
              Se sei al telefono con qualcuno che NON conosci e in cui CONFIANZA ti ha chiesto di installare RustDesk,
              <br />
              non installare e riaggancia immediatamente. <br />
              Probabilmente sono truffatori che cercano di rubarti i soldi o
            </>
          ),
          ko: (
            <>
              경고: 사기당하고 있을 수 있습니다! <br />
              RustDesk를 설치하라고 요청한 사람과 전화 중이고, 그 사람을 모르고 믿을 수 없다면,
              <br />
              설치하지 말고 즉시 전화를 끊으십시오. <br />
              그들은 아마도 돈이나 다른 개인 정보를 훔치려는 사기꾼일 가능성이 높습니다.
            </>
          ),
          ar: (
            <>
              تحذير: قد تكون ضحية احتيال! <br />
              إذا كنت تتحدث عبر الهاتف مع شخص لا تعرفه وطلب منك تثبيت RustDesk،
              <br />
              لا تقم بالتثبيت واغلق المكالمة فوراً. <br />
              من المحتمل أنهم محتالون يحاولون سرقة أموالك.
            </>
          ),
        })}
      </span>
      <button className="bg-none border-none text-lg cursor-pointer mr-4" onClick={handleClose}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="currentColor"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScammingBanner;
