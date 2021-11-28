#https://github.com/AshishPhadtare1999/Merge-ppt-using-python/blob/master/MergePPT.py
import win32com.client
import os
def merge_presentations(presentations, path):
  ppt_instance = win32com.client.Dispatch('PowerPoint.Application')
  # open the powerpoint presentation headless in background
  prs = ppt_instance.Presentations.open(os.path.abspath(presentations[0]), True, False, False)

  for i in range(1, len(presentations)):
      for x in range(3):
        prs.Slides.InsertFromFile(os.path.abspath(presentations[i]), prs.Slides.Count)

  prs.SaveAs(os.path.abspath(path))
  prs.Close()

path1=".\Message Board (initial).pptx"    
path2=".\Additional Slides.pptx"
lst=[path1,path2]
output_path=".\Message Board.pptx"    # Keep output presentation file path
merge_presentations(lst,output_path)