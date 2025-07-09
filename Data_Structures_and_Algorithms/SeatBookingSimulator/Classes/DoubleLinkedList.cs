using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
namespace SeatBookingSimulator.Classes
{
    [Serializable]
    class DoubleLinkedList
    {
        //"Always make sure" that this "start" refers to the first node of the list.

        public Node Start { get; set; }

        public DoubleLinkedList()
        {
            this.Start = null;
        }

        public void InsertAtEnd(Seat seatData)
        {
            Node newNode = new Node(seatData);

            if (this.Start == null)
            {
                this.Start = newNode;
                seatData.ParentLinkedListNode = newNode;
                return;
            }

            Node p = this.Start;

            // Traverse through the list until the p refers to the last node.
            while (p.next != null)
            {
                p = p.next;
            }

            p.next = newNode;
            newNode.prev = p;
            seatData.ParentLinkedListNode = newNode;
        }

        public void SortAscending()
        {
            int swapHasHappened = 0;
            Node p;
            Node lastNodeThatDoesNotRequireToCompare = null;

            do
            {
                swapHasHappened = 0;
                p = this.Start;

                while ((p.next != null) && (p.next != lastNodeThatDoesNotRequireToCompare))
                {
                    if (p.seat.Segment_No > p.next.seat.Segment_No)
                    {
                        Node i = p;
                        Node j = p.next;
                        Node h = i.prev;
                        Node k = j.next;
                        if (this.Start == i)
                        {
                            this.Start = j;
                        }
                        if (h != null)
                        {
                            h.next = j;
                        }
                        j.prev = h;
                        j.next = i;
                        i.prev = j;
                        i.next = k;
                        if (k != null)
                        {
                            k.prev = i;
                        }
                        swapHasHappened = 1;
                    }
                    if (p.next != null)
                    {
                        p = p.next;
                    }

                }
                if (p.prev != null)
                {
                    lastNodeThatDoesNotRequireToCompare = p.prev;
                }
            }
            while (swapHasHappened != 0);
            return;
        }

        public Seat SearchByRowAndColumn(int pRow, int pColumn)
        {
            Node p = this.Start;
            while (p != null)
            {
                if ((p.seat.SeatNumber == pColumn) && (p.seat.Row == pRow))
                {
                    //If the node referenced by p satisfies the search criteria, exit the loop
                    //The p will reference the node which satisfies the search criteria before exiting the while loop.
                    break;
                }
                p = p.next;
            }

            if (p == null)
            {
                return null;
            }
            else
            {
                return p.seat;
            }
        }

        public List<int> SeatCounter(List<int> SegmentCount)
        {
            Node p;
            int counter = 1;
            if (this.Start != null)
            {
                p = this.Start;
                while (p != null)
                {
                    if (p.next != null)
                    {
                        p = p.next;
                    }
                    else
                    {
                        SegmentCount.Add(counter);
                        break;
                    }

                    if (p.prev.seat.Segment_No == p.seat.Segment_No)
                    {
                        counter += 1;
                    }
                    else
                    {
                        SegmentCount.Add(counter);
                        counter = 1;
                    }
                }
            }
            return SegmentCount;
        }
    }
}
