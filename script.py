import random
from colorama import Fore, Back, Style
import pandas as pd
import math
import matplotlib.pyplot as plt

def rnd(): #returns a random number between 0 and 1
    return random.random()

def get_points(n=1): #returns a list of n random numbers between 0 and 1 after sorting them
    points = []
    for i in range(n):
        points.append(rnd())
    points.sort()
    return points

def disp(points): #displays the list of points
    points.sort()
    print(*points)

def find_min_interval(points): #returns the minimum interval between two points and the index of the first point of the interval
    m=1.0
    ind = -1
    for i in range(len(points)-1):
        if points[i+1]-points[i] < m:
            m = points[i+1]-points[i]
            ind = i
    return m,ind


def experiment(n=1, trials=1000): #returns the average minimum interval between two points
    min_avg = 0
    for i in range(trials):
        points = get_points(n)
        m,ind = find_min_interval(points)
        min_avg += m
    min_avg /= trials
    return min_avg

def print_params(n, trials): #prints the parameters of the experiment
    print(Fore.GREEN + "[i] Parameters")
    print("-----------")
    print(Fore.BLUE, "n = ", n, "trials = ", trials)
    print(Style.RESET_ALL)

def print_results(min_avg): #prints the results of the experiment
    print(Fore.GREEN + "[i] Results")
    print("-----------")
    print(Fore.BLUE, "min_avg = ", min_avg)
    print(Style.RESET_ALL)

def output(n, trials, min_avg,p10,c10): #outputs the results to an excel file
    
    

    data = {
        "n":n,
        "Power of 10": p10,
        "Trials": trials,
        "Length of smallest interval":min_avg,
        "Closest power of 10": c10
    }

    df = pd.DataFrame(data)
    print(df)
    df.to_excel("results.xlsx")

def plot(x, y):
    fig, ax = plt.subplots()

    ax.plot(x, y, linewidth=2.0)
    plt.xlabel("log(N)")
    plt.ylabel("log(min_sep)")
    plt.title("Results")
    plt.show()  

def main(pow=5, trials=1000, p = False):
    n_list = []
    trials_list = []
    min_list = []

    for i in range(1,pow+1):
        n = 10**i
        n_list.append(n)
        min_avg = experiment(n, trials)
        min_list.append(min_avg)
        trials_list.append(trials)
        print_params(n, trials)
        print_results(min_avg)
    
    p10 = [math.log10(x) for x in n_list]
    c10 = [round(math.log10(num)) for num in min_list]


    output(n_list,trials_list, min_list,p10,c10)
    if(p):
        plot(p10, [math.log10(x) for x in min_list])

if __name__ == "__main__":
    trials = int(input("No of trials >>> "))
    maxn = int(input("Maximum power of 10 >>> "))
    p = input ("plot graph? [y/N] >>>" )
    pl = True if p=="y" or p=="Y" else False
    main(maxn,trials, pl)