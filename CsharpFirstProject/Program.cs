using System;
using System.Collections.Generic;
using System.Text;

class Kata
{
    public static string SendMessage(string message)
    {
        StringBuilder result = new StringBuilder();
        int previousKey = -4;
        int currentKey = -3;
        Dictionary<int, string> keyPad = new Dictionary<int, string>
      {
          {1, ".,?!"}, {2, "abc"}, {3, "def"},
          {4, "ghi"}, {5, "jkl"}, {6, "mno"},
          {7, "pqrs"}, {8, "tuv"}, {9, "wxyz"},
          {-1, "'-+="}, {0, " "}, {-2, "case"}
      };
        bool caps = false;
        for (int i = 0; i < message.Length; i++)
        {
            if (char.IsUpper(message[i]) && caps == false)
            {
                caps = true;
                result.Append("#");
                previousKey = '#';
            }
            if (char.IsLower(message[i]) && caps == true)
            {
                caps = false;
                result.Append("#");
                previousKey = '#';
            }
            else if (char.IsDigit(message[i]) || message[i] == '#' || message[i] == '*')
            {
                if ((message[i] - '0') == previousKey || (message[i] == '*'))
                {
                    try
                    {
                        if (char.IsDigit(message[i]) && result[result.Length - 1] != '-')
                        {
                            result.Append(' ');
                        }
                    }
                    catch (IndexOutOfRangeException) { }
                    try
                    {
                        if (previousKey == -1 && message[i] == '*' && message[i - 1] != '-')
                        {
                            result.Append(' ');
                        }
                    }
                    catch (IndexOutOfRangeException) { }
                }
                result.Append(message[i]);
                result.Append("-");
                if (message[i] == '*')
                {
                    previousKey = -1;
                }
                else
                {
                    previousKey = message[i] - '0';
                }
                continue;
            }
            else if (message[i] == ' ')
            {
                try
                {
                    if (result[result.Length - 1] == '0')
                    {
                        result.Append(' ');
                    }
                }
                catch (IndexOutOfRangeException) { }
                result.Append(0);
                previousKey = 0;
                continue;
            }
            foreach (KeyValuePair<int, string> kvp in keyPad)
            {
                if (kvp.Value.Contains(Char.ToLower(message[i])))
                {
                    currentKey = kvp.Key;
                    int index = kvp.Value.IndexOf(Char.ToLower(message[i]));
                    if (currentKey == previousKey)
                    {
                        try
                        {
                            if (result[result.Length - 1] != '-')
                            {
                                result.Append(" ");
                            }
                        }
                        catch (IndexOutOfRangeException) { }
                    }
                    for (int j = 0; j <= index; j++)
                    {
                        if (currentKey == -1)
                        {
                            result.Append('*');
                        }
                        else
                        {
                            result.Append(currentKey);
                        }
                    }
                    previousKey = currentKey;
                    break;
                }
            }
        }
        return result.ToString();
    }
}

class Programm
{
    static void Main(string[] args)
    {
        Console.WriteLine(Kata.SendMessage("My Name Is Omar, I am Dentist and SWE !!"));
        Console.WriteLine(Kata.SendMessage("Thank GOD for Every thing !!"));
    }
}