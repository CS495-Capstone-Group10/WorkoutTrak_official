import pandas as pd

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
df_all_2022_fall = pd.concat(dfs_list_2022_fall, ignore_index=True)
df_all_2023_spring = pd.concat(dfs_list_2023_spring, ignore_index=True)

# Name to be found and made a file of
name = 'Markel'
df_filtered = df_all_2023_spring[df_all_2023_spring['name'] == name]

# generating output file
with pd.ExcelWriter('./output.xlsx') as writer:
    df_filtered.to_excel(writer, index=False, sheet_name='Filtered Data')