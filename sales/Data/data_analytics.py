import numpy as np 
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches  
import seaborn as sns
# Reading in Files
file_2022_fall = pd.ExcelFile('2022_fall_workouts.xlsx')
file_2023_spring = pd.ExcelFile('2023_spring_workouts.xlsx')

# Instantiating respective dictionaries
dfs_2022_fall = {}
dfs_2023_spring = {}

# Extracting different sheets
for sheet_name in file_2022_fall.sheet_names:
    df_2022_fall = pd.read_excel('2022_fall_workouts.xlsx', sheet_name=sheet_name)
    dfs_2022_fall[sheet_name] = df_2022_fall
    
for sheet_name in file_2023_spring.sheet_names:
    df_2023_spring = pd.read_excel('2023_spring_workouts.xlsx', sheet_name=sheet_name)
    dfs_2023_spring[sheet_name] = df_2023_spring


dfs_list_2022_fall = list(dfs_2022_fall.values())
dfs_list_2023_spring = list(dfs_2023_spring.values())

# Saving as a concatenated list
df_all_2022_fall = pd.concat(dfs_list_2022_fall)
df_all_2023_spring = pd.concat(dfs_list_2023_spring)

# Name to be found and made a file of
name = 'Markel'
df_filtered_2022_fall = df_all_2022_fall[df_all_2022_fall['name'] == name]
df_filtered_2023_spring = df_all_2022_fall[df_all_2022_fall['name'] == name]

output_filename = f'./{name}_output.xlsx'
# generating output file
with pd.ExcelWriter(output_filename) as writer:
    df_filtered_2022_fall.to_excel(writer, index=False, sheet_name='Filtered Data')
    df_filtered_2023_spring.to_excel(writer, index=False, sheet_name='Filtered Data')

# File to do analytics
df_analytic_file = pd.read_excel(output_filename)

# Info about the file
print(df_analytic_file.info())
print(df_analytic_file.head())
print(df_analytic_file.describe())

# collecting desired data
desired_data = ['PR', '4x10', '6x6.40', '5x8', '4x10', '3x13.20', '6k']

df_desired_data = {}
for data in desired_data:
    df_desired_data[data] = df_analytic_file.filter(like=data)

desired_data_list = pd.concat(list(df_desired_data.values()))

filtered_filename = f'./{name}_filtered.xlsx'

with pd.ExcelWriter(filtered_filename) as writer:
    desired_data_list.to_excel(writer, index=False, sheet_name='Filtered Data')

