import json
import sqlite3

# 1. Baza faylını yaradırıq (young_diagnose.db)
conn = sqlite3.connect('young_diagnose.db')
cursor = conn.cursor()

# 2. Cədvəli yaradırıq
cursor.execute('''
CREATE TABLE IF NOT EXISTS DTC_Logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dtc_code TEXT UNIQUE,
    description TEXT,
    ai_solution TEXT
)
''')

# 3. JSON faylını oxuyuruq
with open('xetalar.json', 'r', encoding='utf-8') as fayl:
    datalar = json.load(fayl)

elave_edilen_say = 0

# 4. JSON içindəki məlumatları təhlükəsiz şəkildə dövrəyə salırıq
for item in datalar:
    # Əgər struktur normaldırsa və "hisseler" sözü varsa
    if 'hisseler' in item:
        marka = item.get('marka', 'Bilinməyən Marka')
        for hisse in item['hisseler']:
            kateqoriya = hisse.get('kateqoriya', '')
            for xeta in hisse.get('xetalar', []):
                kod = xeta.get('kod')
                izah = xeta.get('izah', '')
                sebeb = xeta.get('sebeb', '')
                hell = xeta.get('hell', '')
                
                tesvir = f"{marka} - {kateqoriya}: {izah}"
                
                ai_helli_json = {
                    "xeta_kodu": kod,
                    "qisa_tesvir": izah,
                    "mumkun_sebebler": [sebeb],
                    "hell_addimlari": [hell]
                }
                ai_helli_metn = json.dumps(ai_helli_json, ensure_ascii=False)

                try:
                    cursor.execute("INSERT INTO DTC_Logs (dtc_code, description, ai_solution) VALUES (?, ?, ?)", 
                                   (kod, tesvir, ai_helli_metn))
                    elave_edilen_say += 1
                except sqlite3.IntegrityError:
                    pass

    # Əgər "hisseler" sözü yoxdursa, amma birbaşa xətalar varsa (Mercedes-dəki struktur xətası kimi)
    elif 'xetalar' in item:
        kateqoriya = item.get('kateqoriya', 'Bilinməyən Sistem')
        for xeta in item.get('xetalar', []):
            kod = xeta.get('kod')
            izah = xeta.get('izah', '')
            sebeb = xeta.get('sebeb', '')
            hell = xeta.get('hell', '')
            
            tesvir = f"Sistem - {kateqoriya}: {izah}"
            
            ai_helli_json = {
                "xeta_kodu": kod,
                "qisa_tesvir": izah,
                "mumkun_sebebler": [sebeb],
                "hell_addimlari": [hell]
            }
            ai_helli_metn = json.dumps(ai_helli_json, ensure_ascii=False)

            try:
                cursor.execute("INSERT INTO DTC_Logs (dtc_code, description, ai_solution) VALUES (?, ?, ?)", 
                               (kod, tesvir, ai_helli_metn))
                elave_edilen_say += 1
            except sqlite3.IntegrityError:
                pass

# 5. Dəyişiklikləri yadda saxlayıb bazanı bağlayırıq
conn.commit()
conn.close()

print(f"Möhtəşəm! Cəmi {elave_edilen_say} ədəd xəta kodu məlumat bazasına uğurla əlavə edildi.")