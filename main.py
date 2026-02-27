import eel
import os

# Frontend fayllarının olduğu qovluğu (cari qovluğu) təyin edirik
web_dir = os.path.dirname(os.path.abspath(__file__))
eel.init(web_dir)

# Frontend tərəfindən çağırıla bilən Python funksiyası (Bridge)
@eel.expose
def python_mesajini_al(mesaj):
    print(f"Frontend-dən gələn mesaj: {mesaj}")
    # Frontend-ə cavab göndəririk
    return "Bağlantı uğurludur! Python-dan Salamlar 🐍"

if __name__ == '__main__':
    print("Eel serveri işə düşür...")
    # Proqramı index.html səhifəsi ilə başladırıq
    try:
        eel.start('index.html', size=(1200, 800))
    except (SystemExit, MemoryError, KeyboardInterrupt):
        print("Proqram bağlandı.")
