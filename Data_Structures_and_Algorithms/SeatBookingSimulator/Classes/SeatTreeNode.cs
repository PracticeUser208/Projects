using System;
using System.Collections.Generic;
using System.Text;

namespace SeatBookingSimulator.Classes
{
    class SeatTreeNode
    {
        public SeatTreeNode()
        {
            this.ChildNode = new List<SeatTreeNode>();
        }

        public Seat Data { get; set; }

        public SeatTreeNode Parent { get; set; }

        public List<SeatTreeNode> ChildNode { get; set; }

        public void AddNode(SeatTreeNode pSeatTreeNode)
        {
            if (!this.ChildNode.Contains(pSeatTreeNode))
            {
                pSeatTreeNode.Parent = this;
                this.ChildNode.Add(pSeatTreeNode);
            }
        }
    }
}