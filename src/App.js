import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Bot,
  User,
  Coffee,
  ShoppingCart,
  GraduationCap,
  Heart,
  Building,
  Gamepad2,
} from "lucide-react";

const ChatbotDemo = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Merhaba! Ben ChatBot Demosuyum. Size chatbotların farklı sektörlerdeki kullanım alanlarını gösterebilirim. Hangi sektörü merak ediyorsunuz?",
      timestamp: new Date(),
      options: [
        { id: "ecommerce", text: "🛒 E-Ticaret", icon: ShoppingCart },
        { id: "education", text: "🎓 Eğitim", icon: GraduationCap },
        { id: "healthcare", text: "🏥 Sağlık", icon: Heart },
        { id: "business", text: "🏢 İş Dünyası", icon: Building },
        { id: "entertainment", text: "🎮 Eğlence", icon: Gamepad2 },
      ],
    },
  ]);

  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentFlow, setCurrentFlow] = useState("main");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scenarios = {
    ecommerce: {
      greeting:
        "E-ticaret chatbot asistanınız devrede! Size nasıl yardımcı olabilirim?",
      flows: {
        product_search:
          "Ürün aramak için kategorinizi seçin: Elektronik, Giyim, Ev & Yaşam",
        order_status:
          "Sipariş takibi için sipariş numaranızı girebilir veya 'test123' yazabilirsiniz",
        support:
          "Müşteri desteği için şu konularda yardım edebilirim: İade, Değişim, Teknik Destek",
      },
      responses: {
        test123:
          "Siparişiniz hazırlanıyor! Tahmini teslimat süresi: 2-3 iş günü. Kargo takip kodu: TK123456789",
        elektronik:
          "Popüler elektronik ürünler: Akıllı telefon (%20 indirim), Laptop (ücretsiz kargo), Kulaklık (2+1 kampanya)",
        iade: "İade işlemi 14 gün içinde yapılabilir. Ürün kutusunu ve faturayı saklamanız gerekir.",
      },
    },
    education: {
      greeting:
        "Eğitim asistanınız hazır! Öğrenme yolculuğunuzda size nasıl yardımcı olabilirim?",
      flows: {
        course_info:
          "Hangi kurs hakkında bilgi almak istiyorsunuz? JavaScript, Python, Data Science",
        assignment:
          "Ödev yardımı için konunuzu belirtin: Matematik, Fizik, Programlama",
        schedule: "Ders programınızı görmek için 'program' yazın",
      },
      responses: {
        javascript:
          "JavaScript kursu: 40 saat, 8 hafta, sertifikalı. Başlangıç seviyesi. Kayıt için 'kayıt' yazın",
        program:
          "Bugünkü dersleriniz: 09:00 - Algoritma Temelleri, 14:00 - Web Geliştirme, 16:00 - Proje Sunumu",
        matematik:
          "Hangi matematik konusunda yardım istiyorsunuz? Türev, İntegral, Limit, Fonksiyonlar",
      },
    },
    healthcare: {
      greeting:
        "Sağlık asistanınız burada! Size nasıl yardımcı olabilirim? (Bu demo amaçlıdır, gerçek tıbbi tavsiye vermez)",
      flows: {
        appointment:
          "Randevu almak için bölüm seçin: Dahiliye, Kardiyoloji, Nöroloji",
        symptoms:
          "Semptom değerlendirmesi için 'semptom' yazın (sadece bilgilendirme amaçlı)",
        medication: "İlaç hatırlatması için 'ilaç' yazın",
      },
      responses: {
        randevu:
          "Dahiliye için müsait randevular: Yarın 10:00, 14:00, 16:00. Hangi saati tercih edersiniz?",
        semptom:
          "Semptomlarınızı anlattığınız için teşekkürler. Ciddi semptomlar için lütfen doktorunuza başvurun.",
        ilaç: "İlaç hatırlatma sistemi aktif. Günde 3 kez, yemeklerden sonra. Sonraki doz: 2 saat sonra",
      },
    },
    business: {
      greeting: "İş asistanınız hazır! Hangi konuda destek almak istiyorsunız?",
      flows: {
        hr: "İnsan kaynakları: Başvuru durumu, Maaş bordrosu, İzin talebi",
        meeting: "Toplantı planlamak için 'toplantı' yazın",
        reports: "Raporlar için 'rapor' yazın",
      },
      responses: {
        toplantı:
          "Toplantı planlandı: Yarın 14:00, Toplantı Salonu A. Katılımcılara davet gönderildi.",
        rapor:
          "Bu ayki satış raporu: %15 artış, hedefin %110'u gerçekleşti. Detaylı rapor e-postanızda.",
        izin: "İzin talebiniz onaylandı. 5 günlük izin, 15-19 Temmuz arası. İyi tatiller!",
      },
    },
    entertainment: {
      greeting: "Eğlence botunuz hazır! Hangi türde eğlence arıyorsunuz?",
      flows: {
        game: "Oyun önerileri için 'oyun' yazın",
        movie: "Film önerileri için 'film' yazın",
        music: "Müzik önerileri için 'müzik' yazın",
      },
      responses: {
        oyun: "Size uygun oyunlar: Sudoku (zeka), Kelime Oyunu (eğitici), Arcade (aksiyon). Hangisini oynamak istersiniz?",
        film: "Bugünkü önerilerim: 'Inception' (bilim-kurgu), 'The Office' (komedi), 'Planet Earth' (belgesel)",
        müzik:
          "Ruh halinize göre müzik: Sakin (Lo-fi), Enerjik (Pop), Odaklanma (Klasik). Hangisi?",
      },
    },
  };

  const addMessage = (type, content, options = null) => {
    const newMessage = {
      id: messages.length + 1,
      type,
      content,
      timestamp: new Date(),
      options,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleOptionClick = (optionId) => {
    // Son mesajı ve options'ı güvenli şekilde al
    const lastMessage = messages[messages.length - 1];
    const options = lastMessage?.options;

    // Options yoksa erken çık
    if (!options || !Array.isArray(options)) {
      console.log("Options bulunamadı:", lastMessage);
      return;
    }

    // Option text'ini güvenli şekilde bul
    const selectedOption = options.find((opt) => opt.id === optionId);
    const optionText = selectedOption?.text || "Seçim yapıldı";

    addMessage("user", optionText);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      if (currentFlow === "main") {
        setCurrentFlow(optionId);
        const scenario = scenarios[optionId];
        if (scenario) {
          addMessage("bot", scenario.greeting, [
            {
              id: "option1",
              text: Object.keys(scenario.flows)[0]
                .replace("_", " ")
                .toUpperCase(),
            },
            {
              id: "option2",
              text: Object.keys(scenario.flows)[1]
                .replace("_", " ")
                .toUpperCase(),
            },
            {
              id: "option3",
              text: Object.keys(scenario.flows)[2]
                .replace("_", " ")
                .toUpperCase(),
            },
            { id: "back", text: "↩️ Ana Menü" },
          ]);
        }
      } else if (optionId === "back") {
        setCurrentFlow("main");
        addMessage(
          "bot",
          "Ana menüye döndük. Başka hangi sektörü merak ediyorsunuz?",
          [
            { id: "ecommerce", text: "🛒 E-Ticaret", icon: ShoppingCart },
            { id: "education", text: "🎓 Eğitim", icon: GraduationCap },
            { id: "healthcare", text: "🏥 Sağlık", icon: Heart },
            { id: "business", text: "🏢 İş Dünyası", icon: Building },
            { id: "entertainment", text: "🎮 Eğlence", icon: Gamepad2 },
          ]
        );
      } else if (
        optionId === "option1" ||
        optionId === "option2" ||
        optionId === "option3"
      ) {
        // Sektör içi seçenekler için özel yanıtlar
        const scenario = scenarios[currentFlow];
        if (scenario) {
          const flowKeys = Object.keys(scenario.flows);
          let selectedFlow = "";
          let responseText = "";

          if (optionId === "option1") {
            selectedFlow = flowKeys[0];
            responseText = scenario.flows[flowKeys[0]];
          } else if (optionId === "option2") {
            selectedFlow = flowKeys[1];
            responseText = scenario.flows[flowKeys[1]];
          } else if (optionId === "option3") {
            selectedFlow = flowKeys[2];
            responseText = scenario.flows[flowKeys[2]];
          }

          addMessage("bot", responseText, [
            { id: "back", text: "↩️ Ana Menü" },
          ]);
        }
      }
    }, 1000);
  };
  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      addMessage("user", currentMessage);
      const userMsg = currentMessage.toLowerCase();
      setCurrentMessage("");

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);

        // Mevcut akışa göre yanıt ver
        const scenario = scenarios[currentFlow];
        if (scenario && scenario.responses[userMsg]) {
          addMessage("bot", scenario.responses[userMsg]);
        } else {
          addMessage(
            "bot",
            "Üzgünüm, bu konuda yardımcı olamıyorum. Lütfen menüdeki seçeneklerden birini deneyin."
          );
        }
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center space-x-2">
          <Bot className="w-8 h-8" />
          <div>
            <h2 className="text-xl font-bold">ChatBot Demo</h2>
            <p className="text-sm opacity-90">
              Farklı sektörlerdeki kullanım alanlarını keşfedin
            </p>
          </div>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 shadow-md"
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === "bot" && (
                  <Bot className="w-5 h-5 mt-0.5 text-blue-500" />
                )}
                {message.type === "user" && <User className="w-5 h-5 mt-0.5" />}
                <div className="flex-1">
                  <p className="text-sm">{message.content}</p>
                  {message.options && (
                    <div className="grid grid-cols-1 gap-2 mt-3">
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleOptionClick(option.id)}
                          className="flex items-center space-x-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md transition-colors text-sm"
                        >
                          {option.icon && <option.icon className="w-4 h-4" />}
                          <span>{option.text}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 shadow-md px-4 py-2 rounded-lg max-w-xs">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-500" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Mesajınızı yazın..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Gönder</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 İpucu: Yukarıdaki butonları kullanarak veya direkt yazarak chatbot
          ile etkileşime geçebilirsiniz
        </p>
      </div>
    </div>
  );
};

function App() {
  return <ChatbotDemo />;
}

export default App;
