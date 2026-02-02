"""
Script to invert logo colors:
- White → Indigo (#3949ab)
- Blue → White
"""

from PIL import Image
import numpy as np

# Pfad zum Logo
input_path = 'src/assets/img/Logo.jpg'
output_path = 'src/assets/img/Logo_inverted.jpg'

# Farben definieren
INDIGO = (57, 73, 171)  # #3949ab - Seitenleistenfarbe
WHITE = (255, 255, 255)

# Bild laden
img = Image.open(input_path)
img_array = np.array(img)

# Kopie erstellen für Ausgabe
result = img_array.copy()

# Toleranz für Farberkennung (0-255)
tolerance = 30

# Funktion um zu prüfen ob eine Farbe nahe an einer Zielfarbe ist
def is_color_similar(pixel, target_color, tolerance):
    return all(abs(int(pixel[i]) - target_color[i]) <= tolerance for i in range(3))

# Durchlaufe alle Pixel
height, width = img_array.shape[:2]
for y in range(height):
    for x in range(width):
        pixel = img_array[y, x]
        
        # Wenn Pixel weiß ist → zu Indigo ändern
        if is_color_similar(pixel, WHITE, tolerance):
            result[y, x] = INDIGO
        
        # Wenn Pixel blau ist → zu Weiß ändern
        # Erkenne Blautöne (niedriger Rot/Grün, hoher Blau-Wert)
        elif pixel[2] > pixel[0] + 50 and pixel[2] > pixel[1] + 50:
            result[y, x] = WHITE

# Ergebnis speichern
result_img = Image.fromarray(result)
result_img.save(output_path, 'JPEG', quality=95)

print(f"✅ Logo erfolgreich konvertiert!")
print(f"📁 Gespeichert unter: {output_path}")
print(f"Weiß → Indigo ({INDIGO})")
print(f"Blau → Weiß ({WHITE})")
