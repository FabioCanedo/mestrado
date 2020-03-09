//This program creates a list of values of sin of x, with x going from 0 to pi

#include <iostream>
#include <fstream>
#include <math.h>
using namespace std;

int factorial (int j)
{
	if (j==0)
	{
		return 1;
	}
	else
	{
		return j*factorial(j-1);
	}
}

double eto (double x, int j)
{	
	if (j<0)
	{
		return 1/eto(x,-j);
	}
	else if (j==0)
	{
		return 1;
	}
	else
	{
		return x*eto(x,j-1);
	}
}

double sqrt (double x)
{
	double sqrt=1;
	double a;
	for (int i=0; i<100; i++)
	{
		a=sqrt+x/sqrt;
		sqrt=a/2;
	}
	return sqrt;
}

double nextTerm (int j, double x)
{
	double term;
	term=1;
	for (int i=1; i<=2*j+1; i++)
	{
		term=term*x/i;
	}
	term=eto(-1,j)*term;
	return term;
}

int main ()
{
	double x,sin,cos;
	double special;
	x=0;
	sin=0;
	double y;
	double pi=3.141592654;
	int n=3*16;
	ofstream myfile;
	myfile.open("sin.txt");
	myfile << "x \t sin(x) \t cos(x) \n";
	myfile.precision(8);
	for (int i=0; i<=n; i++)
	{
		x=i*4*pi/n;
//		if (x<pi/2)
//		{
			sin=0;
			for (int j=0; j<1000; j++)
			{
				sin=sin+nextTerm(j,x);
			}
			cos=sqrt(1-eto(sin,2));
//		}
//		else
//		{
//			sin=0;
//			y=pi-x;
//			for (int j=0; j<50; j++)
//			{
//				sin=sin+nextTerm(j,y);
//			}
//			cos=-sqrt(1-eto(sin,2));
//		}
		if (abs(cos-sin)<1E-8)
		{
			special=x;
			cout << "Raiz de 2 é aproximada por: " << 2*sin << endl;
		}
		myfile << x << "\t" << sin << "\t" << cos << "\n";
	}
	myfile.close();
	cout << "raiz de 2 =" << sqrt(2) << endl;
	cout << "raiz de 3 =" << sqrt(3) << endl;
	cout << "raiz de 9 =" << sqrt(9) << endl;
	cout << "raiz de 4 =" << sqrt(4) << endl;
	cout << "raiz de 0.25 =" << sqrt(0.25) << endl;
	return 0;
}
