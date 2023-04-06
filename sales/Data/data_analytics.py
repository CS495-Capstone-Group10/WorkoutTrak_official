import pandas as pd

file_2022_fall = pd.ExcelFile('2022_fall_workouts.xlsx')
file_2023_spring = pd.ExcelFile('2023_spring_workouts.xlsx')

dfs_2022_fall = {}
dfs_2023_spring = {}

sheet_names_2022_fall = file_2022_fall.sheet_names
sheet_names_2023_spring = file_2023_spring.sheet_names

for sheet_name in sheet_names_2022_fall:
    df_2022_fall = pd.read_excel('2022_fall_workouts.xlsx', sheet_name=sheet_name)
    dfs_2022_fall[sheet_name] = df_2022_fall
    
for sheet_name in sheet_names_2023_spring:
    df_2023_spring = pd.read_excel('2023_spring_workouts.xlsx', sheet_name=sheet_name)
    dfs_2023_spring[sheet_name] = df_2023_spring
    


print(df_2022_fall)
print(df_2023_spring)
