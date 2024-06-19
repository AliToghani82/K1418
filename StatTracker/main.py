import pyautogui
from PIL import Image
import pytesseract
import cv2
import pandas as pd
import os

range_num = 324

def extract_nameOfUser_from_region(image, x, y, width, height):
  languages = 'eng+chi_sim+kor+jpn+ara'
  # Crop the image to the specified region
  region = image[y:y+height, x:x+width]
  # Convert the region to grayscale
  region = cv2.cvtColor(region, cv2.COLOR_BGR2GRAY)
  # Perform OCR to extract text from the region
  extracted_text = pytesseract.image_to_string(region, lang=languages)
  cv2.imwrite("region_image.png", region)
  return extracted_text.strip()

def extract_name_from_region(image, x, y, width, height):
  # Crop the image to the specified region
  region = image[y:y+height, x:x+width]
  # Convert the region to grayscale
  region = cv2.cvtColor(region, cv2.COLOR_BGR2GRAY)
  # Perform OCR to extract text from the region
  extracted_text = pytesseract.image_to_string(region)
  cv2.imwrite("region_image.png", region)
  return extracted_text.strip()

def process2(filename):
   
  pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

  idsA = []
  powerA = []
  totalKillsA = []
  totalKillsT5A = []
  totalKillsT4A = []
  totalKillsT3A = []
  totalKillsT2A = []
  totalKillsT1A = []
  deathA = []
  namesA = []
  rssGatheredA = []
  rssAssistanceA = []
  AllianceHelpA = []

  print("starting")

  for x in range(range_num):
    # Set the path to the screenshot image file
    screenshot_path = 'ScreenShot' + str(x) + '.png'
    screenshot_path1 = 'ScreenShot' + str(x) + '-1.png'
    screenshot_path2 = 'ScreenShot' + str(x) + '-2.png'
    # Load the screenshot image
    screenshot_image = cv2.imread(screenshot_path)
    screenshot_image1 = cv2.imread(screenshot_path1)
    screenshot_image2 = cv2.imread(screenshot_path2)
    if screenshot_image is None or screenshot_image1 is None or screenshot_image2 is None:
       continue
    # Specify the region coordinates and dimensions for extracting the name

    name_x = 881  # x-coordinate of the name region
    name_y = 218  # y-coordinate of the name region
    name_width = 150  # Width of the name region
    name_height = 60  # Height of the name region

    names_x = 713  # x-coordinate of the name region
    names_y = 265 # y-coordinate of the name region
    names_width = 280  # Width of the name region
    names_height = 60  # Height of the name region

    rssAssistance_x = 1335
    rssAssistance_y = 800
    rssAssistance_width = 275
    rssAssistance_height = 50

    AllianceHelp_x = 1335
    AllianceHelp_y = 870
    AllianceHelp_width = 275 
    AllianceHelp_height =  50

    rssGathered_x = 1335
    rssGathered_y = 725
    rssGathered_width = 275
    rssGathered_height = 60

    power_x = 1021  # x-coordinate of the name region
    power_y = 390  # y-coordinate of the name region
    power_width = 200  # Width of the name region
    power_height = 40  # Height of the name region

    totalKills_x = 1332  # x-coordinate of the name region
    totalKills_y = 390  # y-coordinate of the name region
    totalKills_width = 270  # Width of the name region
    totalKills_height = 50  # Height of the name region

    t5_x = 1031  # x-coordinate of the name region
    t5_y = 720  # y-coordinate of the name region
    t5_width = 172  # Width of the name region
    t5_height = 40  # Height of the name region

    t4_x = 1031  # x-coordinate of the name region
    t4_y = 665  # y-coordinate of the name region
    t4_width = 172  # Width of the name region
    t4_height = 40  # Height of the name region

    t3_x = 1031  # x-coordinate of the name region
    t3_y = 615  # y-coordinate of the name region
    t3_width = 172  # Width of the name region
    t3_height = 40  # Height of the name region

    t2_x = 1031  # x-coordinate of the name region
    t2_y = 565 # y-coordinate of the name region
    t2_width = 172  # Width of the name region
    t2_height = 40  # Height of the name region

    t1_x = 1031  # x-coordinate of the name region
    t1_y = 505  # y-coordinate of the name region
    t1_width = 172  # Width of the name region
    t1_height = 40  # Height of the name region

    death_x = 1335  # x-coordinate of the name region
    death_y = 525  # y-coordinate of the name region
    death_width = 275  # Width of the name region
    death_height = 55  # Height of the name region

    # Extract the name from the region
    #First Image:
    #ID
    name = extract_name_from_region(screenshot_image, name_x, name_y, name_width, name_height)

    name = ''.join(filter(str.isdigit, name))
    power = extract_name_from_region(screenshot_image, power_x, power_y, power_width, power_height)

    totalKills = extract_name_from_region(screenshot_image, totalKills_x, totalKills_y, totalKills_width,totalKills_height)
    
    names = extract_nameOfUser_from_region(screenshot_image, names_x, names_y, names_width, names_height)

    #second image
    totalKillsT4 = extract_name_from_region(screenshot_image1, t4_x, t4_y, t4_width, t4_height)
    
    totalKillsT5 = extract_name_from_region(screenshot_image1, t5_x, t5_y, t5_width, t5_height)

    totalKillsT3 = extract_name_from_region(screenshot_image1, t3_x, t3_y, t3_width, t3_height)
    
    totalKillsT2 = extract_name_from_region(screenshot_image1, t2_x, t2_y, t2_width, t2_height)
    
    totalKillsT1 = extract_name_from_region(screenshot_image1, t1_x, t1_y, t1_width, t1_height)

    #3rd image
    death = extract_name_from_region(screenshot_image2, death_x, death_y, death_width, death_height)

    rssAssistance = extract_name_from_region(screenshot_image2, rssAssistance_x, rssAssistance_y, rssAssistance_width, rssAssistance_height)
    
    AllianceHelp = extract_name_from_region(screenshot_image2, AllianceHelp_x, AllianceHelp_y, AllianceHelp_width, AllianceHelp_height)

    rssGathered = extract_name_from_region(screenshot_image2, rssGathered_x, rssGathered_y, rssGathered_width, rssGathered_height)

    power = power.replace(",", "")

    name = name.replace(",", "")
    name = name.replace(" ", "")
    name = name.replace(")", "")


    names = names.replace("\n\n", " ")

    totalKills = totalKills.replace(",", "")

    death = death.replace(",", "")

    totalKillsT4 = totalKillsT4.replace(",", "")
    totalKillsT4 = totalKillsT4.replace(".", "")
    totalKillsT4 = totalKillsT4.replace(" ", "")
    totalKillsT4 = totalKillsT4.replace(")", "")

    totalKillsT5 = totalKillsT5.replace(",", "")
    totalKillsT5 = totalKillsT5.replace(".", "")
    totalKillsT5 = totalKillsT5.replace(" ", "")
    totalKillsT5 = totalKillsT5.replace(")", "")

    totalKillsT3 = totalKillsT3.replace(",", "")
    totalKillsT3 = totalKillsT3.replace(".", "")
    totalKillsT3 = totalKillsT3.replace(" ", "")
    totalKillsT3 = totalKillsT3.replace(")", "")
   
    totalKillsT2 = totalKillsT2.replace(",", "")
    totalKillsT2 = totalKillsT2.replace(".", "")
    totalKillsT2 = totalKillsT2.replace(" ", "")
    totalKillsT2 = totalKillsT2.replace(")", "")
   
    totalKillsT1 = totalKillsT1.replace(",", "")
    totalKillsT1 = totalKillsT1.replace(".", "")
    totalKillsT1 = totalKillsT1.replace(" ", "")
    totalKillsT1 = totalKillsT1.replace(")", "")

    if(name in idsA):
       continue

    print(name)
    print(power)
    print(totalKills)
    print(death)
    print(names)

    namesA.append(names)
    idsA.append(name)
    powerA.append(power)
    totalKillsA.append(totalKills)
    totalKillsT5A.append(totalKillsT5)
    totalKillsT4A.append(totalKillsT4)
    totalKillsT3A.append(totalKillsT3)
    totalKillsT2A.append(totalKillsT2)
    totalKillsT1A.append(totalKillsT1)
    rssAssistanceA.append(rssAssistance)
    AllianceHelpA.append(AllianceHelp)
    rssGatheredA.append(rssGathered)
    deathA.append(death)
#    if(int(name) == 21302679):
#        break;


# Create a DataFrame from the values list
  print(idsA)
  df = pd.DataFrame({'Id': idsA, 'name': namesA, 'Power': powerA, 'Total_Kills': totalKillsA, 'T5_Kills': totalKillsT5A, 'T4_Kills': totalKillsT4A , 'T3_Kills': totalKillsT3A, 'T2_Kills': totalKillsT2A, 'T1_Kills': totalKillsT1A, 'Deaths': deathA, 'RssAssistance': rssAssistanceA, 'RssGathered': rssGatheredA, 'AllianceHelp': AllianceHelpA})                            
  df.to_csv(filename)

def process(filename):

  pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

  idsA = []
  powerA = []
  totalKillsA = []
  totalKillsT5A = []
  totalKillsT4A = []
  totalKillsT3A = []
  totalKillsT2A = []
  totalKillsT1A = []
  deathA = []
  namesA = []
  rssGatheredA = []
  rssAssistanceA = []
  AllianceHelpA = []

  print("starting")

  for x in range(range_num):
    if x == 151:
       continue
    # Set the path to the screenshot image file
    screenshot_path = 'ScreenShot' + str(x) + '.png'
    screenshot_path1 = 'ScreenShot' + str(x) + '-1.png'
    screenshot_path2 = 'ScreenShot' + str(x) + '-2.png'
    # Load the screenshot image
    screenshot_image = cv2.imread(screenshot_path)
    screenshot_image1 = cv2.imread(screenshot_path1)
    screenshot_image2 = cv2.imread(screenshot_path2)
    # Specify the region coordinates and dimensions for extracting the name
    name_x = 880  # x-coordinate of the name region
    name_y = 235  # y-coordinate of the name region
    name_width = 150  # Width of the name region
    name_height = 35  # Height of the name region

    names_x = 700  # x-coordinate of the name region
    names_y = 272 # y-coordinate of the name region
    names_width = 280  # Width of the name region
    names_height = 60  # Height of the name region

    rssAssistance_x = 1380
    rssAssistance_y = 805
    rssAssistance_width = 200
    rssAssistance_height = 50

    AllianceHelp_x = 1440
    AllianceHelp_y = 880
    AllianceHelp_width = 175 
    AllianceHelp_height =  50

    rssGathered_x = 1350
    rssGathered_y = 730
    rssGathered_width = 260
    rssGathered_height = 60

    power_x = 1044  # x-coordinate of the name region
    power_y = 395  # y-coordinate of the name region
    power_width = 200  # Width of the name region
    power_height = 40  # Height of the name region

    totalKills_x = 1340  # x-coordinate of the name region
    totalKills_y = 387  # y-coordinate of the name region
    totalKills_width = 270  # Width of the name region
    totalKills_height = 50  # Height of the name region

    t5_x = 1030  # x-coordinate of the name region
    t5_y = 725  # y-coordinate of the name region
    t5_width = 172  # Width of the name region
    t5_height = 36  # Height of the name region

    t4_x = 1030  # x-coordinate of the name region
    t4_y = 672  # y-coordinate of the name region
    t4_width = 172  # Width of the name region
    t4_height = 36  # Height of the name region

    t3_x = 1030  # x-coordinate of the name region
    t3_y = 620  # y-coordinate of the name region
    t3_width = 172  # Width of the name region
    t3_height = 36  # Height of the name region

    t2_x = 1030  # x-coordinate of the name region
    t2_y = 565 # y-coordinate of the name region
    t2_width = 172  # Width of the name region
    t2_height = 36  # Height of the name region

    t1_x = 1030  # x-coordinate of the name region
    t1_y = 510  # y-coordinate of the name region
    t1_width = 172  # Width of the name region
    t1_height = 36  # Height of the name region

    death_x = 1400  # x-coordinate of the name region
    death_y = 535  # y-coordinate of the name region
    death_width = 200  # Width of the name region
    death_height = 55  # Height of the name region

    # Extract the name from the region
    #First Image:
    name = extract_name_from_region(screenshot_image, name_x, name_y, name_width, name_height)

    name = ''.join(filter(str.isdigit, name))
    power = extract_name_from_region(screenshot_image, power_x, power_y, power_width, power_height)

    totalKills = extract_name_from_region(screenshot_image, totalKills_x, totalKills_y, totalKills_width,totalKills_height)
    
    names = extract_nameOfUser_from_region(screenshot_image, names_x, names_y, names_width, names_height)

    #second image
    totalKillsT4 = extract_name_from_region(screenshot_image1, t4_x, t4_y, t4_width, t4_height)
    
    totalKillsT5 = extract_name_from_region(screenshot_image1, t5_x, t5_y, t5_width, t5_height)

    totalKillsT3 = extract_name_from_region(screenshot_image1, t3_x, t3_y, t3_width, t3_height)
    
    totalKillsT2 = extract_name_from_region(screenshot_image1, t2_x, t2_y, t2_width, t2_height)
    
    totalKillsT1 = extract_name_from_region(screenshot_image1, t1_x, t1_y, t1_width, t1_height)

    #3rd image
    death = extract_name_from_region(screenshot_image2, death_x, death_y, death_width, death_height)
 
    rssAssistance = extract_name_from_region(screenshot_image2, rssAssistance_x, rssAssistance_y, rssAssistance_width, rssAssistance_height)
    
    AllianceHelp = extract_name_from_region(screenshot_image2, AllianceHelp_x, AllianceHelp_y, AllianceHelp_width, AllianceHelp_height)

    rssGathered = extract_name_from_region(screenshot_image2, rssGathered_x, rssGathered_y, rssGathered_width, rssGathered_height)

    power = power.replace(",", "")
    name = name.replace(",", "")
    name = name.replace(" ", "")
    name = name.replace(")", "")
    names = names.replace("\n\n", " ")
    totalKills = totalKills.replace(",", "")
    death = death.replace(",", "")

    totalKillsT4 = totalKillsT4.replace(",", "")
    totalKillsT4 = totalKillsT4.replace(".", "")
    totalKillsT4 = totalKillsT4.replace(" ", "")
    totalKillsT4 = totalKillsT4.replace(")", "")

    totalKillsT5 = totalKillsT5.replace(",", "")
    totalKillsT5 = totalKillsT5.replace(".", "")
    totalKillsT5 = totalKillsT5.replace(" ", "")
    totalKillsT5 = totalKillsT5.replace(")", "")

    totalKillsT3 = totalKillsT3.replace(",", "")
    totalKillsT3 = totalKillsT3.replace(".", "")
    totalKillsT3 = totalKillsT3.replace(" ", "")
    totalKillsT3 = totalKillsT3.replace(")", "")
   
    totalKillsT2 = totalKillsT2.replace(",", "")
    totalKillsT2 = totalKillsT2.replace(".", "")
    totalKillsT2 = totalKillsT2.replace(" ", "")
    totalKillsT2 = totalKillsT2.replace(")", "")
   
    totalKillsT1 = totalKillsT1.replace(",", "")
    totalKillsT1 = totalKillsT1.replace(".", "")
    totalKillsT1 = totalKillsT1.replace(" ", "")
    totalKillsT1 = totalKillsT1.replace(")", "")

    if(name in idsA):
       continue

    print(name)
    print(power)
    print(totalKills)
    print(death)
    print(names)

    namesA.append(names)
    idsA.append(name)
    powerA.append(power)
    totalKillsA.append(totalKills)
    totalKillsT5A.append(totalKillsT5)
    totalKillsT4A.append(totalKillsT4)
    totalKillsT3A.append(totalKillsT3)
    totalKillsT2A.append(totalKillsT2)
    totalKillsT1A.append(totalKillsT1)
    rssAssistanceA.append(rssAssistance)
    AllianceHelpA.append(AllianceHelp)
    rssGatheredA.append(rssGathered)
    deathA.append(death)
#    if(int(name) == 21302679):
#        break;


# Create a DataFrame from the values list
  df = pd.DataFrame({'Id': idsA, 'name': namesA, 'Power': powerA, 'Total_Kills': totalKillsA, 'T5_Kills': totalKillsT5A, 'T4_Kills': totalKillsT4A , 'T3_Kills': totalKillsT3A, 'T2_Kills': totalKillsT2A, 'T1_Kills': totalKillsT1A, 'Deaths': deathA, 'RssAssistance': rssAssistanceA, 'RssGathered': rssGatheredA, 'AllianceHelp': AllianceHelpA})                            
  df.to_csv(filename)

def get_mouse_coordinates():
    print("Move your mouse to the desired location...")
    pyautogui.PAUSE = 2000  # Add a pause to allow time for positioning
    pyautogui.sleep(4)
    x, y = pyautogui.position()
    print("Coordinates:", x, y)

def main2(name):
    # Capture a screenshot
    # Define the coordinates of the minimize button
    pyautogui.sleep(.9)
    minimize_button_x = 1269
    minimize_button_y = 345
    # Move the mouse to the minimize button
    pyautogui.moveTo(minimize_button_x, minimize_button_y, duration=.2)
    pyautogui.sleep(.9)
    pyautogui.click()
    # Pause for a brief moment to ensure the minimize animation is complete
    pyautogui.sleep(1)
    # Capture a screenshot
    screenshot = pyautogui.screenshot()
    name1 = name + ".png"
    screenshot.save(name1)
    main3(name)
    main4(name)
    #closes the app
    minimize_button_x2 = 1680
    minimize_button_y2 = 85

    # Move the mouse to the minimize button
    pyautogui.moveTo(minimize_button_x2, minimize_button_y2, duration=.2)
    pyautogui.sleep(.7)
    pyautogui.click()
    pyautogui.sleep(.7)
    pyautogui.moveTo(minimize_button_x2 - 40, minimize_button_y2, duration=.2)
    pyautogui.click()
    pyautogui.moveTo(minimize_button_x, minimize_button_y, duration=.2)
    print("Screenshot taken after minimizing the screen.")


def main3(name):
    pyautogui.sleep(.9)
    minimize_button_x = 1343
    minimize_button_y = 385

    # Move the mouse to the minimize button
    pyautogui.moveTo(minimize_button_x, minimize_button_y, duration=.2)
    pyautogui.sleep(.9)
    pyautogui.click()
    # Pause for a brief moment to ensure the minimize animation is complete
    pyautogui.sleep(1)
    # Capture a screenshot
    screenshot = pyautogui.screenshot()
    name = name + "-1.png"
    screenshot.save(name)

def main4(name):
    pyautogui.sleep(.9)
    minimize_button_x = 415
    minimize_button_y = 840

    # Move the mouse to the minimize button
    pyautogui.moveTo(minimize_button_x, minimize_button_y, duration=.2)
    pyautogui.sleep(.9)
    pyautogui.click()
    # Pause for a brief moment to ensure the minimize animation is complete
    pyautogui.sleep(1)

    # Capture a screenshot
    screenshot = pyautogui.screenshot()
    name = name + "-2.png"
    screenshot.save(name)


def scrolling(x):
    minimize_button_x = 1269
    minimize_button_y = 340
    pyautogui.sleep(1)
    pyautogui.mouseDown(minimize_button_x, minimize_button_y)
    pyautogui.move(0, -100 * x, duration=1)
    pyautogui.mouseUp()

    return x
def main():
    pyautogui.sleep(5)
    case = 0;
    for x in range(range_num):
        name = "ScreenShot" + str(x);
        main2(name);
        if case == 0:
            z = (x % 3) + 1
            scrolling(z)
            if(z == 3):
                case = 1
        else:
            scrolling(3)

def reset ():
    minimize_button_x = 1700
    minimize_button_y = 50

    power_x = 463
    power_y = 599

    # Move the mouse to the minimize button
    pyautogui.moveTo(minimize_button_x, minimize_button_y, duration=.2)
    pyautogui.click()
    pyautogui.sleep(.9)
    pyautogui.moveTo(power_x, power_y, duration=.2)
    pyautogui.click()

if __name__ == "__main__":
  path_to_test1 = r"C:\Users\alito\Desktop\PersonalProjects\RiseOfKingdoms\StatBot\StatBot\t1"
  path_to_test2 = r"C:\Users\alito\Desktop\PersonalProjects\RiseOfKingdoms\StatBot\StatBot\collection2-2014-prekvk"
  os.chdir(path_to_test1)
  print("Current Directory:", os.getcwd())
  #main()
#   reset()
  process2('K1418_prekvk.csv')
#   os.chdir(path_to_test2)
#   print("Current Directory:", os.getcwd())
#   main()
#   process('K1418-2.csv')