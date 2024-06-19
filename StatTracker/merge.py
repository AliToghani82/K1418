import pandas as pd

# Load the first CSV file
csv1 = pd.read_csv('AllTime.csv')


# Load the second CSV file
csv2 = pd.read_csv('temp.csv')

csv1['Id'] = csv1['Id'].astype(str).str.replace('.0', '')
csv2['Id'] = csv2['Id'].astype(str).str.replace('.0', '')

csv1['Id'] = csv1['Id'].str.strip()
csv2['Id'] = csv2['Id'].str.strip()

print("First few rows of csv1:")
print(csv1.head())

print("First few rows of csv2:")
print(csv1.columns)
print(csv2.columns)
# Convert the 'Id' columns to string to ensure they are of the same type
# Merge the two CSV files on the 'Id' column using a left join
# This keeps all rows from csv1 and adds data from csv2 where there's a match
merged_csv = csv1.merge(csv2, on='Id', how='left', suffixes=('', '_APR_24'))
print(merged_csv.head())
# Save the merged data to a new CSV file
merged_csv.to_csv('AllTime_Merge.csv', index=False)